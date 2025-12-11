// src/lib/imagepath.js

// This file centralizes all core technology icon paths used across your components.
// All paths beginning with '/' are assumed to be relative to the 'public/icons' directory.

export const TechIconMap = {
    // ----------------------------------------------------------------------------------
    // --- CORE TECHNOLOGIES & FRAMEWORKS (Cleaned and Mapped)
    // ----------------------------------------------------------------------------------
    
    // --- Languages & Backend ---
    'Python': '/icons/python.png',
    'JavaScript': '/icons/JavaScript.svg',
    'TypeScript': '/icons/ts.png', 
    'Java': '/icons/Java.svg', 
    'Bash': '/icons/Bash.svg',
    'FastAPI': '/icons/fast.png', 
    'Django': '/icons/Django.svg', // Keeping the main icon
    'Django REST Framework': '/icons/Django REST.svg',
    'Node.js': '/icons/node.png',
    'Spring': '/icons/spring-icon.svg',
    
    // --- Frontend & UI ---
    'React': '/icons/react.png', 
    'Nextjs': '/icons/nextjs.png', 
    'HTML': '/icons/html5.png',
    'CSS': '/icons/css3.png',
    'Tailwind CSS': '/icons/tailwind.png', 
    'Framer Motion': '/icons/FramerMotion.svg', 
    'Storybook': '/icons/Storybook.svg',
    'Flutter': '/icons/Flutter.svg',
    'Dart': '/icons/Dart.svg',
    "AppScript": '/icons/script.png',

    // --- Databases & ORMs ---
    'PostgreSQL': '/icons/postgres.png',
    'Prisma': '/icons/prisma.png', 
    'MongoDB': '/icons/mongo.png',
    
    // --- Cloud & DevOps ---
    "AWS": '/icons/AWS.svg', // Main AWS icon
    'AWS CloudWatch': '/icons/aws-cloudwatch.svg',
    'AWS S3': '/icons/aws-s3.svg',
    'AWS Secrets Manager': '/icons/aws-secrets-manager.svg',
    'AWS EC2': '/icons/ecc.svg', // Renamed ECC to AWS EC2
    'Docker': '/icons/docker.png', // Keeping the main icon
    'Kubernetes': '/icons/kubernetes.png', // Keeping the main icon
    'NGINX': '/icons/NGINX.svg',
    'Vercel': '/icons/vercel.png',
    'Git': '/icons/git.png',
    'Podman': '/icons/Podman(4).svg',

    // --- AI/ML & Utilities ---
    'Gen-AI': '/icons/genai.png', 
    'Jupyter': '/icons/Jupyter.svg',
    'Streamlit': '/icons/Streamlit.svg',
    'Postman': '/icons/Postman.svg',
    'n8n': '/icons/n8n.png',
    'Zapier': '/icons/zapier.png',
    'Stripe': '/icons/Stripe.svg', 
    'JWT': '/icons/jwt-icon.svg',
    'pnpm': '/icons/pnpm.svg',
    'LaTeX': '/icons/LaTeX.svg', // Keeping technical document tools
    'TeX': '/icons/TeX.svg',
    'Ubuntu': '/icons/ubuntu.svg',
    'Linux Tux': '/icons/linux-tux.svg',
    'PyCharm': '/icons/PyCharm.svg',

    // --- Removed External/Redundant Icons: ---
    // 'Tableau', 'Request', 'Excel', 'WikiPedia', 'Word', 'Cloud Run',
    // 'Django Icon', 'Kubernetes Alt', 'Docker Icon', 'Crowdin', 'GNOME', 'Kaggle', 
    // 'Maven', 'Miro', 'Discord', 'LinkedIn', 'Google Bard', 'Gmail', 'X (Twitter)'
};


// ----------------------------------------------------------------------------------
// --- INDIVIDUAL EXPORTS (Simplified and Cleaned List) ---
// ----------------------------------------------------------------------------------

// --- Languages & Backend ---
export const Python = TechIconMap['Python'];
export const JavaScript = TechIconMap['JavaScript'];
export const AppScript = TechIconMap['AppScript'];
export const TypeScript = TechIconMap['TypeScript'];
export const Java = TechIconMap['Java'];
export const Bash = TechIconMap['Bash'];
export const FastAPI = TechIconMap['FastAPI'];
export const Django = TechIconMap['Django'];
export const DjangoRESTFramework = TechIconMap['Django REST Framework'];
export const Nodejs = TechIconMap['Node.js'];
export const Spring = TechIconMap['Spring'];

// --- Frontend & UI ---
export const ReactIcon = TechIconMap['React']; 
export const Nextjs = TechIconMap['Nextjs'];
export const HTML = TechIconMap['HTML'];
export const CSS = TechIconMap['CSS'];
export const TailwindCSS = TechIconMap['Tailwind CSS'];
export const FramerMotion = TechIconMap['Framer Motion'];
export const Storybook = TechIconMap['Storybook'];
export const Flutter = TechIconMap['Flutter'];
export const Dart = TechIconMap['Dart'];

// --- Databases & ORMs ---
export const PostgreSQL = TechIconMap['PostgreSQL'];
export const Prisma = TechIconMap['Prisma'];
export const MongoDB = TechIconMap['MongoDB'];

// --- Cloud & DevOps ---
export const AWS = TechIconMap['AWS'];
export const AWSS3 = TechIconMap['AWS S3'];
export const AWSCloudWatch = TechIconMap['AWS CloudWatch'];
export const AWSSecretsManager = TechIconMap['AWS Secrets Manager'];
export const AWSEC2 = TechIconMap['AWS EC2'];
export const Docker = TechIconMap['Docker'];
export const Kubernetes = TechIconMap['Kubernetes'];
export const NGINX = TechIconMap['NGINX'];
export const Vercel = TechIconMap['Vercel'];
export const Git = TechIconMap['Git'];
export const Podman = TechIconMap['Podman'];

// --- AI/ML & Utilities ---
export const GenAI = TechIconMap['Gen-AI']; 
export const Jupyter = TechIconMap['Jupyter'];
export const Streamlit = TechIconMap['Streamlit'];
export const Postman = TechIconMap['Postman'];
export const n8n = TechIconMap['n8n'];
export const Zapier = TechIconMap['Zapier'];
export const Stripe = TechIconMap['Stripe'];
export const JWT = TechIconMap['JWT'];
export const Pnpm = TechIconMap['pnpm'];
export const LaTeX = TechIconMap['LaTeX'];
export const TeX = TechIconMap['TeX'];
export const Ubuntu = TechIconMap['Ubuntu'];
export const LinuxTux = TechIconMap['Linux Tux'];
export const PyCharm = TechIconMap['PyCharm'];


// Export for non-tech icons
export const othericons = {
    defaultAvatar: '/images/default_avatar.png'
};

// Removed Ambiguous/Redundant Exports (e.g., WikiExtraction, GoogleCloud, DjangoIcon, DockerIcon, etc.)