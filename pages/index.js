import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import animated background to avoid SSR issues
const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground'),
  { ssr: false, loading: () => null }
);

// SVG Icons as components
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

const WebsiteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 003 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    try {
      // Dynamically import the libraries
      const html2canvasModule = await import('html2canvas');
      const jspdfModule = await import('jspdf');
      
      const html2canvas = html2canvasModule.default;
      const jsPDF = jspdfModule.default;
      
      const element = contentRef.current;
      if (!element) {
        throw new Error('Content element not found');
      }

      // Hide animated background and download button for PDF
      const animatedBg = document.querySelector('canvas');
      const downloadContainer = document.querySelector('.download-container');
      
      if (animatedBg) animatedBg.style.display = 'none';
      if (downloadContainer) downloadContainer.style.display = 'none';

      // Wait a moment for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      // Restore visibility
      if (animatedBg) animatedBg.style.display = '';
      if (downloadContainer) downloadContainer.style.display = '';

      const imgData = canvas.toDataURL('image/jpeg', 0.85);
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = -pdfHeight + (imgHeight - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('Alejandro_De_La_Mora_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Alejandro De La Mora | AI Solutions Architect</title>
      </Head>

      {mounted && <AnimatedBackground />}

      <div ref={contentRef}>
        {/* Header Section */}
        <header className="header">
          <div className="container">
            <div className="header-content animate-fade-in">
              <h1 className="header-name">Alejandro De La Mora</h1>
              
              <div className="header-contact">
                <a href="mailto:alex@seshwithfriends.org" className="contact-item">
                  <EmailIcon />
                  <span>alex@seshwithfriends.org</span>
                </a>
                <a href="tel:+14372433693" className="contact-item">
                  <PhoneIcon />
                  <span>+1 437 243 3693</span>
                </a>
                <a href="https://www.linkedin.com/in/amorac/" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </a>
                <a href="http://www.eloruga.com" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <WebsiteIcon />
                  <span>Website</span>
                </a>
                <a href="https://github.com/Oruga420" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="container">
          {/* Professional Summary Section */}
          <section className="section animate-fade-in animate-delay-1">
            <h2 className="section-title">Professional Summary</h2>
            <p>
              AI Solutions Architect and Senior Engineer with a proven track record of shipping GenAI that works in production. 
              Specialized in building foundational infrastructure, RAG systems, and agentic workflows that have scaled AI adoption 
              from <span className="highlight">47% to 97%</span> and saved over <span className="highlight">20,000 engineering hours annually</span>. 
              Expertise in operationalizing LLMs, architecting secure abstraction layers on GCP/AWS, and leading cross-functional 
              teams to democratize access to generative AI tools at the enterprise level.
            </p>
          </section>

          <div className="divider"></div>

          {/* Technical Skills Section */}
          <section className="section animate-fade-in animate-delay-2">
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <div className="skill-category-title">GenAI &amp; ML</div>
                <div className="skill-tags">
                  <span className="skill-tag">RAG</span>
                  <span className="skill-tag">Vector Databases</span>
                  <span className="skill-tag">Agentic Workflows</span>
                  <span className="skill-tag">LangChain patterns</span>
                  <span className="skill-tag">OpenAI/Anthropic/Gemini APIs</span>
                  <span className="skill-tag">Prompt Engineering</span>
                </div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Cloud &amp; Backend</div>
                <div className="skill-tags">
                  <span className="skill-tag">Google Cloud Platform (GCP)</span>
                  <span className="skill-tag">AWS</span>
                  <span className="skill-tag">Vercel</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">Next.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Custom MCP Servers</span>
                </div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Observability &amp; DevOps</div>
                <div className="skill-tags">
                  <span className="skill-tag">LLM Evaluation</span>
                  <span className="skill-tag">System Integration</span>
                  <span className="skill-tag">CI/CD</span>
                  <span className="skill-tag">Automated Testing</span>
                </div>
              </div>
              <div className="skill-category">
                <div className="skill-category-title">Platform</div>
                <div className="skill-tags">
                  <span className="skill-tag">Salesforce Development</span>
                  <span className="skill-tag">Zapier</span>
                  <span className="skill-tag">Workflow Automation</span>
                </div>
              </div>
            </div>
          </section>

          <div className="divider"></div>

          {/* Professional Experience Section */}
          <section className="section animate-fade-in animate-delay-3">
            <h2 className="section-title">Professional Experience</h2>
            
            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <span className="experience-company">Assent</span>
                  <span className="experience-title"> | AI Solutions Architect</span>
                </div>
                <span className="experience-date">Feb 2025 - Present</span>
              </div>
              <ul className="experience-description">
                <li><strong>Infrastructure &amp; Architecture:</strong> Architected and deployed a secure, auditable GenAI stack on GCP and AWS. Built the foundational layer connecting internal apps to LLMs (OpenAI, Anthropic, Gemini) via live RAG.</li>
                <li><strong>Agentic Workflows:</strong> Designed and implemented autonomous Agentic Workflows and custom MCP servers to safely expose internal data and tools, resulting in over <span className="highlight">20,000 man-hours saved</span> in the first year.</li>
                <li><strong>Adoption &amp; Scaling:</strong> Drove internal AI adoption from <span className="highlight">47% to 97%</span> by creating intuitive internal tools that abstract complex model interactions for non-technical teams.</li>
                <li><strong>Operational Excellence:</strong> Established governance, documentation, and evaluation frameworks to ensure all AI deployments are safe, cost-effective, and production-ready.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <span className="experience-company">Sesh | AI Solutions</span>
                  <span className="experience-title"> | AI Solutions Architect</span>
                </div>
                <span className="experience-date">Nov 2021 - Present</span>
              </div>
              <ul className="experience-description">
                <li><strong>GenAI Development:</strong> Designed the architecture for over <span className="highlight">120 GenAI applications</span> and <span className="highlight">90+ productive chatbots</span> across 30+ clients, delivering robust solutions for real-world problems.</li>
                <li><strong>Platform Engineering:</strong> Built foundational infrastructure for clients to integrate LLMs into their existing technology stacks, enabling automated operations and data processing.</li>
                <li><strong>Community Leadership:</strong> Lead a community of 100+ members, providing training on GenAI workflows and automation. Deliver technical webinars for groups like Latinas in Tech.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <span className="experience-company">Globalization Partners</span>
                  <span className="experience-title"> | Salesforce Manager &amp; AI Lead</span>
                </div>
                <span className="experience-date">Nov 2018 - Nov 2023</span>
              </div>
              <ul className="experience-description">
                <li><strong>AI Innovation:</strong> Led the internal GenAI development stream, building and deploying &apos;GIA&apos;, the company&apos;s first internal chatbot, laying the groundwork for future AI integration.</li>
                <li><strong>Platform Scale:</strong> Managed a Salesforce environment with 1,000+ licenses, ensuring high availability, security, and scalability for business-critical operations.</li>
                <li><strong>Engineering Leadership:</strong> Transitioned from Admin to Manager, overseeing the technical roadmap and leading integration projects between CRM and external services.</li>
              </ul>
            </div>

            <div className="experience-item">
              <div className="experience-header">
                <div>
                  <span className="experience-company">Amstar DMC</span>
                  <span className="experience-title"> | Project Manager</span>
                </div>
                <span className="experience-date">May 2016 - Nov 2018</span>
              </div>
              <ul className="experience-description">
                <li>Managed complex web and integration projects with budgets up to <span className="highlight">$700k</span>, leading cross-functional teams of up to 18 people. Focused on aligning technical deliverables with strict business timelines.</li>
              </ul>
            </div>
          </section>

          <div className="divider"></div>

          {/* Education Section */}
          <section className="section animate-fade-in animate-delay-4">
            <h2 className="section-title">Education</h2>
            <div className="education-item">
              <span className="education-degree">Ingenieria en Sistemas (Systems Engineering)</span>
              <span className="education-school">Universidad Marista de Mérida</span>
              <span className="education-year">2004 - 2007</span>
            </div>
          </section>

          <div className="divider"></div>

          {/* Projects & Community Section */}
          <section className="section animate-fade-in animate-delay-5" style={{ paddingBottom: '6rem' }}>
            <h2 className="section-title">Projects &amp; Community</h2>
            
            <div className="project-item">
              <div className="project-title">GenAI Workflow Repository</div>
              <p className="project-description">
                Public demonstration of production-ready patterns for LLM integration and automation.
              </p>
              <a href="https://github.com/Oruga420" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <GitHubIcon />
                View on GitHub
              </a>
            </div>

            <div className="project-item">
              <div className="project-title">Tech Community Leader</div>
              <p className="project-description">
                Regular speaker and mentor for <em>Latinas in Tech</em> and <em>Somos Latinos in Tech Ottawa</em>, 
                helping bridge the gap between diverse talent and AI technology.
              </p>
            </div>
          </section>
        </main>
      </div>

      {/* Download PDF Button */}
      <div className="download-container">
        <button 
          className="download-btn" 
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          style={{ opacity: isDownloading ? 0.7 : 1 }}
        >
          <DownloadIcon />
          {isDownloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>
    </>
  );
}
