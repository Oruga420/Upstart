import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Alejandro De La Mora - AI Solutions Architect and Senior Engineer specializing in GenAI, RAG systems, and agentic workflows." />
        <meta name="author" content="Alejandro De La Mora" />
        <meta name="keywords" content="AI Solutions Architect, GenAI, RAG, LLM, Cloud Architecture, GCP, AWS" />
        <meta property="og:title" content="Alejandro De La Mora | AI Solutions Architect" />
        <meta property="og:description" content="AI Solutions Architect specializing in GenAI infrastructure, RAG systems, and enterprise AI adoption." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
