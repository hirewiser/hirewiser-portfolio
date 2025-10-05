import type { UserProfile } from '@/components/portfolio-data-provider';

export const fetchPortfolio = async (username: string) => {
  const portfolioURL = process.env.COFOUNDS_API_URL;

  if (!portfolioURL) {
    return {
      success: false,
      message: "API URL not configured",
      data: null,
      error: new Error("COFOUNDS_API_URL not set")
    };
  }

  const fullURL = `${portfolioURL}/${username}`;

  try {
    const portfolioData = await fetch(fullURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-App/1.0',
      },
      next: { revalidate: 60 }
    });

    if (!portfolioData.ok) {
      const errorText = await portfolioData.text();
      return {
        success: false,
        message: `API request failed with status ${portfolioData.status}`,
        data: null,
        error: new Error(`HTTP ${portfolioData.status}: ${errorText}`)
      };
    }

    const responseText = await portfolioData.text();
    let jsonRes;
    
    try {
      jsonRes = JSON.parse(responseText);
    } catch (parseError) {
      return {
        success: false,
        message: "Invalid JSON response",
        data: null,
        error: parseError
      };
    }

    if (jsonRes && jsonRes.data) {
      return {
        success: true,
        message: "Portfolio Fetched successfully!",
        data: jsonRes.data,
        error: null
      };
    } else {
      return {
        success: false,
        message: "Invalid response structure",
        data: null,
        error: new Error("Invalid API response structure")
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the portfolio!",
      data: null,
      error: error
    };
  }
}

export const transformUserData = (userData: UserProfile) => {
  try {
    const username = userData.userName;
    const name = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
    const initials = `${userData.firstName?.[0] || ''}${userData.lastName?.[0] || ''}`.toUpperCase();
    const avatarUrl = userData.profileImage || '';
    const description = userData.headerText || '';
    const summary = userData.description || '';

    const skills = userData.skillset?.map((s: any) => s.skill?.name).filter(Boolean) || [];

    const work = userData.experience?.map((e: any) => ({
      company: e.companyName || '',
      title: e.title || '',
      href: '',
      logoUrl: e.logoURL || '',
      badges: [],
      start: e.startedAt ? new Date(e.startedAt).getFullYear().toString() : '',
      end: e.endAt ? new Date(e.endAt).getFullYear().toString() : null,
      description: e.description || '',
    })).filter((w: any) => w.company) || [];

    const education = userData.education?.map((e: any) => ({
      school: e.eduFrom || '',
      degree: e.degree?.name || '',
      href: e.eduFromLink || '',
      logoUrl: e.logoURL || '',
      start: e.startedAt ? new Date(e.startedAt).getFullYear().toString() : '',
      end: e.endAt ? new Date(e.endAt).getFullYear().toString() : '',
    })).filter((edu: any) => edu.school) || [];

    const projects = userData.projects?.map((p: any) => {
      const projectLinks = p.projectLinks?.map((link: any) => ({
        type: link.linkTitle || 'Website',
        href: link.linkUrl,
        linkTitle: link.linkTitle
      })).filter((link: any) => link.href) || [];

      if (p.link) {
        projectLinks.unshift({
          type: 'Website',
          href: p.link,
          linkTitle: 'Website'
        });
      }

      return {
        title: p.title || '',
        description: p.description || '',
        dates: `${p.startedAt ? new Date(p.startedAt).getFullYear() : ''} - ${p.endAt ? new Date(p.endAt).getFullYear() : 'Present'}`,
        technologies: p.projectSkillset?.map((ps: any) => ps.skill?.name).filter(Boolean) || [],
        image: p.previewImageUrl || '',
        video: '',
        links: projectLinks,
        href: p.link || ''
      };
    }).filter((p: any) => p.title) || [];

    const hackathons = userData.certificates?.map((c: any) => {
      const links = c.link ? [{
        type: c.linkName || 'Open Link',
        href: c.link,
        linkTitle: c.linkName
      }] : [];

      return {
        title: c.title || '',
        description: c.description || '',
        location: c.location || '',
        dates: `${c.startedAt ? new Date(c.startedAt).getFullYear() : ''}${c.endAt ? ` - ${new Date(c.endAt).getFullYear()}` : ''}`,
        image: c.logoURL || '',
        links: links,
      };
    }).filter((h: any) => h.title) || [];

    const socialLinks = userData.links || [];
    const contact = {
      email: userData.email || '',
      social: {} as any,
    };

    socialLinks.forEach((link: any) => {
      if (link.linkTitle && link.linkUrl) {
        const platform = link.linkTitle.toLowerCase();
        contact.social[platform] = {
          name: link.linkTitle,
          url: link.linkUrl,
          navbar: true,
        };
      }
    });

    const transformedData = {
      username,
      name,
      initials,
      url: '',
      location: '',
      locationLink: '',
      avatarUrl,
      description,
      summary,
      navbar: [],
      skills,
      work,
      education,
      projects,
      hackathons,
      contact,
    };

    return transformedData;
  } catch (error) {
    throw error;
  }
};


export const extractUsername = (headersList: Headers) => {
  const host = headersList.get('host');
  const xForwardedHost = headersList.get('x-forwarded-host');
  const actualHost = xForwardedHost || host || '';

  let username = '';
  let hasValidSubdomain = false;

  if (actualHost) {
    const parts = actualHost.split('.');

    if (parts.length >= 3) {
      const subdomain = parts[0];
      const domain = parts.slice(1).join('.');

      if (domain === 'buildarclabs.in' || domain === 'cofounds.in') {
        const reserved = ['www', 'api', 'admin', 'app', 'mail', 'blog', 'docs'];
        if (!reserved.includes(subdomain.toLowerCase())) {
          username = subdomain;
          hasValidSubdomain = true;
        }
      }
    }
    else if (parts.length >= 2 && (parts[1] === 'localhost' || parts[1].includes('localhost'))) {
      username = parts[0];
      hasValidSubdomain = true;
    }
  }

  return { username, hasValidSubdomain };
};
