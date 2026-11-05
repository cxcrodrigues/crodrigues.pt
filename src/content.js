export default {
 "locales": [
  {
   "code": "en",
   "label": "EN",
   "name": "English"
  },
  {
   "code": "pt",
   "label": "PT",
   "name": "Português"
  },
  {
   "code": "es",
   "label": "ES",
   "name": "Español"
  },
  {
   "code": "de",
   "label": "DE",
   "name": "Deutsch"
  }
 ],
 "i18n": {
  "en": {
   "skip": "Skip to content",
   "theme": "Switch colour theme",
   "language": "Language",
   "nav": {
    "about": "About",
    "work": "Work",
    "experience": "Experience",
    "skills": "Skills",
    "contact": "Contact"
   },
   "hero": {
    "title": "Engineering Lead",
    "statement": "I build cloud infrastructure, data pipelines and SaaS products, and lead the teams that ship them.",
    "based": "Based in Kaiserslautern, Germany. Over 10 years across backend, frontend, mobile and infrastructure.",
    "current": "Currently",
    "email": "Email me",
    "cv": "Save CV as PDF"
   },
   "about": {
    "heading": "About Me",
    "bio": "I build scalable, cloud-native systems and lead engineering teams to deliver high-impact products. With over 10 years of experience across backend, frontend, mobile, and infrastructure, I specialize in designing data pipelines, architecting cloud infrastructure on AWS and Google Cloud, and delivering full-stack SaaS and mobility platforms from the ground up. Alongside my full-time roles, I've delivered 8 freelance projects across diverse industries.",
    "stats": {
     "years": "Years Experience",
     "companies": "Companies",
     "freelance": "Freelance Projects",
     "cofounded": "Co-Founded"
    },
    "langTitle": "Languages",
    "languages": [
     {
      "name": "Portuguese",
      "level": "Native"
     },
     {
      "name": "English",
      "level": "C2"
     },
     {
      "name": "German",
      "level": "A2"
     }
    ]
   },
   "work": {
    "heading": "Selected work",
    "layers": {
     "mobile": "Mobile",
     "api": "API",
     "backend": "Backend",
     "frontend": "Frontend",
     "realtime": "Real-time",
     "location": "Location",
     "payments": "Payments",
     "infra": "Infrastructure",
     "delivery": "Delivery",
     "ai": "AI",
     "data": "Data",
     "integrations": "Integrations"
    },
    "items": {
     "fjordrun": {
      "kind": "European cloud platform",
      "summary": "A European platform for running apps: web services, databases, cron jobs, functions and AI agents, deployed from a git push. AI agents can operate it through its MCP server. I’m founding it and building it, and this site runs on it."
     },
     "roamlii": {
      "kind": "AI platform for Canadian tourism",
      "summary": "Operators manage their listings and hiring through an assistant, and travellers find what's on nearby. As CTO, I built the MCP server that opens the platform to any AI client, with every operator change held for human review."
     },
     "movize": {
      "kind": "Mobility platform",
      "summary": "A cross-platform mobility app and the cloud foundation beneath it. I'm responsible for the whole codebase and infrastructure, and for what the team builds and how they build it."
     },
     "driverwise": {
      "kind": "SaaS for automotive businesses",
      "summary": "Digitalises customer data, workflows and service operations for automotive stores and mechanics in Portugal. I co-founded the company and led the platform as CTO until October 2026."
     },
     "circunomics": {
      "kind": "Battery telemetry pipelines",
      "summary": "Data pipelines processing thousands of gigabytes of battery telemetry every day, powering anomaly detection, forecasting and State of Health predictions."
     }
    }
   },
   "experience": {
    "heading": "Experience",
    "timeline": {
     "title": "Career timeline",
     "currentFull": "Current, full-time",
     "currentPart": "Current, part-time",
     "past": "Past role"
    },
    "jobs": [
     {
      "id": "roamlii",
      "company": "Roamlii",
      "role": "CTO",
      "period": "Sep 2026 – Present",
      "location": "Remote",
      "bullets": [
       "Lead technology as CTO of a Canadian tourism platform connecting independent operators, seasonal job seekers and travellers.",
       "Built the Roamlii MCP server in Python, bringing the platform's AI assistant and agent features to any MCP client through separate traveller, operator and admin servers with 65 tools.",
       "Designed for safe AI access: Postgres row-level security decides what each caller can read, and every operator change becomes a proposal the business owner reviews before it applies.",
       "Implemented Supabase-based authentication for HTTP and stdio clients, with admin changes audited to the person who made them.",
       "Built a shared integrations package that normalizes business profiles across listing platforms, starting with Google Maps and Google Business Profile.",
       "Packaged the service with Docker and Helm for Kubernetes deployment."
      ]
     },
     {
      "id": "movize",
      "company": "Movize.pt",
      "role": "Head of Engineering",
      "period": "Jan 2026 – Present",
      "location": "Portugal",
      "bullets": [
       "Hold overall responsibility for the codebase and infrastructure, and for what the team builds and how they build it.",
       "Define and architect the full cloud infrastructure on Google Cloud, including Google Kubernetes Engine for container orchestration and Cloudflare for edge security and performance.",
       "Establish code patterns, development standards, and technical best practices across the engineering team.",
       "Lead feature planning and assign work to team members, ensuring alignment between product goals and technical execution.",
       "Architect a mobility platform built with React Native (Expo) for cross-platform mobile, FastAPI and Symfony for backend APIs, and Firebase for real-time features.",
       "Integrate Google Places API for location-based services within the mobility application."
      ]
     },
     {
      "id": "driverwise",
      "company": "DriverWise LDA",
      "role": "CTO & Co-Founder",
      "period": "May 2024 – Oct 2026",
      "location": "Braga, Portugal",
      "bullets": [
       "Led development and maintenance of a SaaS platform for automotive stores and mechanics in Portugal, enabling full digitalization of customer data, workflows, and service operations.",
       "Architected and developed backend services using Node.js (Express.js) with TypeScript and Prisma.",
       "Built the frontend in Vue.js 3, delivering a modern and intuitive user experience.",
       "Integrated Symfony-based payment processing for secure, automated billing workflows.",
       "Managed cloud-native infrastructure with Kubernetes, Docker, and GitHub Actions CI/CD.",
       "Coordinated with mobile development teams on apps built with Swift (iOS) and Kotlin (Android)."
      ]
     },
     {
      "id": "circunomics",
      "company": "Circunomics GMBH",
      "role": "Senior Software Engineer",
      "period": "Sep 2021 – Present",
      "location": "Mainz, Germany",
      "bullets": [
       "Led end-to-end development of high-scale data pipelines processing thousands of gigabytes of battery telemetry time-series data daily, enabling analytics across anomaly detection, forecasting, and State of Health predictions.",
       "Served as cross-team technical leader, defining architecture and best practices for analytics dashboards and advising backend and frontend teams.",
       "Designed and implemented CI/CD pipelines that streamlined delivery and improved engineering velocity.",
       "Architected full cloud and containerized infrastructure: AWS EKS, ECR, S3, and Route 53.",
       "Standardized Kubernetes deployments using Helm charts, ensuring reproducibility and production-grade reliability.",
       "Spearheaded Docker adoption, guaranteeing uniform development environments.",
       "Supported application development across the stack: FastAPI + SQLAlchemy (backend) and Angular (frontend)."
      ]
     },
     {
      "id": "goodlord",
      "company": "Oh Goodlord Ltd",
      "role": "Backend Engineer",
      "period": "Nov 2020 – Aug 2021",
      "location": "London, UK",
      "bullets": [
       "Developed and maintained Goodlord's award-winning lettings platform, ensuring scalability, reliability, and user focus.",
       "Led feature development, troubleshooting, and performance optimization across PHP 7, Symfony, Docker, Kubernetes, and AWS.",
       "Collaborated with cross-functional teams to deliver high-quality features and maintain system stability."
      ]
     },
     {
      "id": "futuresynergies",
      "company": "Future Synergies LDA",
      "role": "Senior Software Engineer",
      "period": "Jul 2017 – Oct 2020",
      "location": "Sagres, Portugal (Remote)",
      "bullets": [
       "Served as Lead Software Engineer, overseeing architecture, technology selection, and infrastructure design.",
       "Selected and implemented the tech stack: PHP 7.2, Laravel 5, MySQL, Redis, Node.js, and AWS services (EC2, RDS, S3).",
       "Led integration of multiple third-party APIs, payment gateways, and invoicing systems.",
       "Made key strategic decisions on frameworks, infrastructure, and cloud services.",
       "Provided technical leadership and guided junior engineers."
      ]
     },
     {
      "id": "maciv",
      "company": "Maciv Tecnologias LTDA",
      "role": "Software Engineer",
      "period": "May 2016 – Jun 2017",
      "location": "Torres Vedras, Portugal",
      "bullets": [
       "Contributed to development of SaaS offerings focused on social networks for multiple clients.",
       "Built and managed internal tools: server monitoring software, analytics dashboards, and a bug-tracking system.",
       "Collaborated on project planning, technical documentation, and deployment processes."
      ]
     },
     {
      "id": "dateahome",
      "company": "Date A Home LTD",
      "role": "Software Engineer",
      "period": "Jun 2015 – Apr 2016",
      "location": "London, UK (Remote)",
      "bullets": [
       "Started as a developer building a custom WordPress template and plugins, quickly advancing to lead the project.",
       "Developed a unique real estate platform using PHP 5.6 and Laravel 5.1, integrating APIs for property listings, mapping, and user management.",
       "Oversaw system administration including server configuration, deployment, and email service management."
      ]
     }
    ],
    "commitment": {
     "full": "Full-time",
     "part": "Part-time, after hours"
    }
   },
   "skills": {
    "heading": "Skills & Technologies",
    "categories": {
     "Cloud & Infrastructure": "Cloud & Infrastructure",
     "Backend": "Backend",
     "Frontend & Mobile": "Frontend & Mobile",
     "DevOps & Tooling": "DevOps & Tooling"
    }
   },
   "contact": {
    "heading": "Get In Touch",
    "text": "I'm always open to discussing new opportunities, interesting projects, or just having a conversation about technology. Whether you have a question or just want to say hi, feel free to reach out.",
    "button": "Say Hello",
    "copy": "Copy email",
    "copied": "Copied"
   }
  },
  "pt": {
   "skip": "Saltar para o conteúdo",
   "theme": "Mudar o tema de cores",
   "language": "Idioma",
   "nav": {
    "about": "Sobre",
    "work": "Projetos",
    "experience": "Experiência",
    "skills": "Competências",
    "contact": "Contacto"
   },
   "hero": {
    "title": "Líder de Engenharia",
    "statement": "Construo infraestrutura cloud, pipelines de dados e produtos SaaS, e lidero as equipas que os entregam.",
    "based": "Baseado em Kaiserslautern, Alemanha. Mais de 10 anos em backend, frontend, mobile e infraestrutura.",
    "current": "Atualmente",
    "email": "Enviar email",
    "cv": "Guardar CV em PDF"
   },
   "about": {
    "heading": "Sobre Mim",
    "bio": "Construo sistemas escaláveis e cloud-native e lidero equipas de engenharia para entregar produtos de alto impacto. Com mais de 10 anos de experiência em backend, frontend, mobile e infraestrutura, especializo-me no design de pipelines de dados, na arquitetura de infraestrutura cloud na AWS e Google Cloud, e na entrega de plataformas SaaS e de mobilidade full-stack de raiz. Paralelamente aos meus cargos a tempo inteiro, entreguei 8 projetos freelance em diversas indústrias.",
    "stats": {
     "years": "Anos de Experiência",
     "companies": "Empresas",
     "freelance": "Projetos Freelance",
     "cofounded": "Co-Fundadas"
    },
    "langTitle": "Idiomas",
    "languages": [
     {
      "name": "Português",
      "level": "Nativo"
     },
     {
      "name": "Inglês",
      "level": "C2"
     },
     {
      "name": "Alemão",
      "level": "A2"
     }
    ]
   },
   "work": {
    "heading": "Projetos em destaque",
    "layers": {
     "mobile": "Mobile",
     "api": "API",
     "backend": "Backend",
     "frontend": "Frontend",
     "realtime": "Tempo real",
     "location": "Localização",
     "payments": "Pagamentos",
     "infra": "Infraestrutura",
     "delivery": "Entrega",
     "ai": "IA",
     "data": "Dados",
     "integrations": "Integrações"
    },
    "items": {
     "fjordrun": {
      "kind": "Plataforma cloud europeia",
      "summary": "Uma plataforma europeia para correr aplicações: serviços web, bases de dados, cron jobs, funções e agentes de IA, implementados a partir de um git push. Os agentes de IA podem operá-la através do seu servidor MCP. Estou a fundá-la e a construí-la, e este site corre nela."
     },
     "roamlii": {
      "kind": "Plataforma de IA para o turismo canadiano",
      "summary": "Os operadores gerem as suas listagens e contratações através de um assistente, e os viajantes descobrem o que há por perto. Como CTO, construí o servidor MCP que abre a plataforma a qualquer cliente de IA, com cada alteração de um operador sujeita a revisão humana."
     },
     "movize": {
      "kind": "Plataforma de mobilidade",
      "summary": "Uma aplicação de mobilidade multiplataforma e a base cloud que a sustenta. Sou responsável por todo o código e infraestrutura, e pelo que a equipa desenvolve e como o faz."
     },
     "driverwise": {
      "kind": "SaaS para o setor automóvel",
      "summary": "Digitaliza dados de clientes, fluxos de trabalho e operações de serviço de lojas e oficinas automóveis em Portugal. Fui cofundador da empresa e liderei a plataforma como CTO até outubro de 2026."
     },
     "circunomics": {
      "kind": "Pipelines de telemetria de baterias",
      "summary": "Pipelines de dados que processam milhares de gigabytes de telemetria de baterias por dia, suportando deteção de anomalias, previsões e estimativas de State of Health."
     }
    }
   },
   "experience": {
    "heading": "Experiência",
    "timeline": {
     "title": "Percurso profissional",
     "currentFull": "Atual, tempo inteiro",
     "currentPart": "Atual, tempo parcial",
     "past": "Cargo anterior"
    },
    "jobs": [
     {
      "id": "roamlii",
      "company": "Roamlii",
      "role": "CTO",
      "period": "Set 2026 – Presente",
      "location": "Remoto",
      "bullets": [
       "Lidero a tecnologia como CTO de uma plataforma de turismo canadiana que liga operadores independentes, candidatos a trabalhos sazonais e viajantes.",
       "Construí o servidor MCP da Roamlii em Python, levando o assistente de IA e as funcionalidades de agente da plataforma a qualquer cliente MCP, com servidores separados para viajantes, operadores e administradores e 65 ferramentas.",
       "Desenhei o acesso seguro de IA: a segurança ao nível da linha (RLS) do Postgres decide o que cada utilizador pode ler, e cada alteração de um operador passa a ser uma proposta que o dono do negócio revê antes de ser aplicada.",
       "Implementei autenticação baseada em Supabase para clientes HTTP e stdio, com as alterações de administração auditadas em nome de quem as fez.",
       "Construí um pacote de integrações partilhado que normaliza perfis de negócio entre plataformas de listagem, começando pelo Google Maps e pelo Google Business Profile.",
       "Empacotei o serviço com Docker e Helm para implementação em Kubernetes."
      ]
     },
     {
      "id": "movize",
      "company": "Movize.pt",
      "role": "Head of Engineering",
      "period": "Jan 2026 – Presente",
      "location": "Portugal",
      "bullets": [
       "Responsável por todo o código e infraestrutura, e pelo que a equipa desenvolve e como o faz.",
       "Definir e arquitetar toda a infraestrutura cloud no Google Cloud, incluindo Google Kubernetes Engine para orquestração de containers e Cloudflare para segurança e desempenho na edge.",
       "Estabelecer padrões de código, standards de desenvolvimento e melhores práticas técnicas na equipa de engenharia.",
       "Liderar o planeamento de funcionalidades e atribuir trabalho aos membros da equipa, garantindo alinhamento entre os objetivos do produto e a execução técnica.",
       "Arquitetar uma plataforma de mobilidade construída com React Native (Expo) para mobile multiplataforma, FastAPI e Symfony para APIs backend, e Firebase para funcionalidades em tempo real.",
       "Integrar a API do Google Places para serviços baseados em localização na aplicação de mobilidade."
      ]
     },
     {
      "id": "driverwise",
      "company": "DriverWise LDA",
      "role": "CTO & Co-Fundador",
      "period": "Mai 2024 – Out 2026",
      "location": "Braga, Portugal",
      "bullets": [
       "Liderei o desenvolvimento e a manutenção de uma plataforma SaaS para lojas automóveis e mecânicos em Portugal, permitindo a digitalização total de dados de clientes, workflows e operações de serviço.",
       "Arquitetei e desenvolvi serviços backend usando Node.js (Express.js) com TypeScript e Prisma.",
       "Construí o frontend em Vue.js 3, entregando uma experiência de utilizador moderna e intuitiva.",
       "Integrei processamento de pagamentos baseado em Symfony para workflows de faturação seguros e automatizados.",
       "Geri infraestrutura cloud-native com Kubernetes, Docker e GitHub Actions CI/CD.",
       "Coordenei com equipas de desenvolvimento mobile em apps construídas com Swift (iOS) e Kotlin (Android)."
      ]
     },
     {
      "id": "circunomics",
      "company": "Circunomics GMBH",
      "role": "Engenheiro de Software Sénior",
      "period": "Set 2021 – Presente",
      "location": "Mainz, Alemanha",
      "bullets": [
       "Liderou o desenvolvimento end-to-end de pipelines de dados de alta escala, processando milhares de gigabytes de dados de telemetria de baterias diariamente, permitindo analíticas de deteção de anomalias, previsões e State of Health.",
       "Atuou como líder técnico cross-team, definindo arquitetura e melhores práticas para dashboards analíticos e aconselhando equipas de backend e frontend.",
       "Desenhou e implementou pipelines de CI/CD que otimizaram a entrega e melhoraram a velocidade de engenharia.",
       "Arquitetou toda a infraestrutura cloud e containerizada: AWS EKS, ECR, S3 e Route 53.",
       "Standardizou deployments em Kubernetes usando Helm charts, garantindo reprodutibilidade e fiabilidade de nível de produção.",
       "Liderou a adoção de Docker, garantindo ambientes de desenvolvimento uniformes.",
       "Suportou o desenvolvimento de aplicações em todo o stack: FastAPI + SQLAlchemy (backend) e Angular (frontend)."
      ]
     },
     {
      "id": "goodlord",
      "company": "Oh Goodlord Ltd",
      "role": "Engenheiro Backend",
      "period": "Nov 2020 – Ago 2021",
      "location": "Londres, Reino Unido",
      "bullets": [
       "Desenvolveu e manteve a plataforma premiada de arrendamentos da Goodlord, garantindo escalabilidade, fiabilidade e foco no utilizador.",
       "Liderou o desenvolvimento de funcionalidades, troubleshooting e otimização de desempenho em PHP 7, Symfony, Docker, Kubernetes e AWS.",
       "Colaborou com equipas multifuncionais para entregar funcionalidades de alta qualidade e manter a estabilidade do sistema."
      ]
     },
     {
      "id": "futuresynergies",
      "company": "Future Synergies LDA",
      "role": "Engenheiro de Software Sénior",
      "period": "Jul 2017 – Out 2020",
      "location": "Sagres, Portugal (Remoto)",
      "bullets": [
       "Atuou como Lead Software Engineer, supervisionando arquitetura, seleção de tecnologia e design de infraestrutura.",
       "Selecionou e implementou o stack tecnológico: PHP 7.2, Laravel 5, MySQL, Redis, Node.js e serviços AWS (EC2, RDS, S3).",
       "Liderou a integração de múltiplas APIs de terceiros, gateways de pagamento e sistemas de faturação.",
       "Tomou decisões estratégicas chave sobre frameworks, infraestrutura e serviços cloud.",
       "Forneceu liderança técnica e orientou engenheiros juniores."
      ]
     },
     {
      "id": "maciv",
      "company": "Maciv Tecnologias LTDA",
      "role": "Engenheiro de Software",
      "period": "Mai 2016 – Jun 2017",
      "location": "Torres Vedras, Portugal",
      "bullets": [
       "Contribuiu para o desenvolvimento de ofertas SaaS focadas em redes sociais para múltiplos clientes.",
       "Construiu e geriu ferramentas internas: software de monitorização de servidores, dashboards analíticos e um sistema de tracking de bugs.",
       "Colaborou no planeamento de projetos, documentação técnica e processos de deployment."
      ]
     },
     {
      "id": "dateahome",
      "company": "Date A Home LTD",
      "role": "Engenheiro de Software",
      "period": "Jun 2015 – Abr 2016",
      "location": "Londres, Reino Unido (Remoto)",
      "bullets": [
       "Começou como developer a construir um template WordPress personalizado e plugins, avançando rapidamente para liderar o projeto.",
       "Desenvolveu uma plataforma imobiliária única usando PHP 5.6 e Laravel 5.1, integrando APIs para listagens de imóveis, mapeamento e gestão de utilizadores.",
       "Supervisionou a administração de sistemas, incluindo configuração de servidores, deployment e gestão de serviço de email."
      ]
     }
    ],
    "commitment": {
     "full": "Tempo inteiro",
     "part": "Tempo parcial, pós-laboral"
    }
   },
   "skills": {
    "heading": "Competências & Tecnologias",
    "categories": {
     "Cloud & Infrastructure": "Cloud & Infraestrutura",
     "Backend": "Backend",
     "Frontend & Mobile": "Frontend & Mobile",
     "DevOps & Tooling": "DevOps & Ferramentas"
    }
   },
   "contact": {
    "heading": "Entrar em Contacto",
    "text": "Estou sempre aberto a discutir novas oportunidades, projetos interessantes ou simplesmente ter uma conversa sobre tecnologia. Se tem uma pergunta ou quer apenas dizer olá, não hesite em contactar-me.",
    "button": "Dizer Olá",
    "copy": "Copiar email",
    "copied": "Copiado"
   }
  },
  "es": {
   "skip": "Saltar al contenido",
   "theme": "Cambiar el tema de color",
   "language": "Idioma",
   "nav": {
    "about": "Sobre mí",
    "work": "Proyectos",
    "experience": "Experiencia",
    "skills": "Habilidades",
    "contact": "Contacto"
   },
   "hero": {
    "title": "Líder de Ingeniería",
    "statement": "Construyo infraestructura cloud, pipelines de datos y productos SaaS, y lidero los equipos que los entregan.",
    "based": "Radicado en Kaiserslautern, Alemania. Más de 10 años en backend, frontend, mobile e infraestructura.",
    "current": "Actualmente",
    "email": "Enviar email",
    "cv": "Guardar CV en PDF"
   },
   "about": {
    "heading": "Sobre Mí",
    "bio": "Construyo sistemas escalables y cloud-native y lidero equipos de ingeniería para entregar productos de alto impacto. Con más de 10 años de experiencia en backend, frontend, mobile e infraestructura, me especializo en el diseño de pipelines de datos, la arquitectura de infraestructura cloud en AWS y Google Cloud, y la entrega de plataformas SaaS y de movilidad full-stack desde cero. Paralelamente a mis cargos a tiempo completo, he entregado 8 proyectos freelance en diversas industrias.",
    "stats": {
     "years": "Años de Experiencia",
     "companies": "Empresas",
     "freelance": "Proyectos Freelance",
     "cofounded": "Co-Fundadas"
    },
    "langTitle": "Idiomas",
    "languages": [
     {
      "name": "Portugués",
      "level": "Nativo"
     },
     {
      "name": "Inglés",
      "level": "C2"
     },
     {
      "name": "Alemán",
      "level": "A2"
     }
    ]
   },
   "work": {
    "heading": "Proyectos destacados",
    "layers": {
     "mobile": "Mobile",
     "api": "API",
     "backend": "Backend",
     "frontend": "Frontend",
     "realtime": "Tiempo real",
     "location": "Ubicación",
     "payments": "Pagos",
     "infra": "Infraestructura",
     "delivery": "Entrega",
     "ai": "IA",
     "data": "Datos",
     "integrations": "Integraciones"
    },
    "items": {
     "fjordrun": {
      "kind": "Plataforma cloud europea",
      "summary": "Una plataforma europea para ejecutar aplicaciones: servicios web, bases de datos, cron jobs, funciones y agentes de IA, desplegados con un git push. Los agentes de IA pueden operarla a través de su servidor MCP. La estoy fundando y construyendo, y este sitio funciona sobre ella."
     },
     "roamlii": {
      "kind": "Plataforma de IA para el turismo canadiense",
      "summary": "Los operadores gestionan sus listados y contrataciones a través de un asistente, y los viajeros descubren qué hay cerca. Como CTO, construí el servidor MCP que abre la plataforma a cualquier cliente de IA, con cada cambio de un operador sujeto a revisión humana."
     },
     "movize": {
      "kind": "Plataforma de movilidad",
      "summary": "Una aplicación de movilidad multiplataforma y la base cloud que la sostiene. Soy responsable de todo el código y la infraestructura, y de lo que el equipo desarrolla y cómo lo hace."
     },
     "driverwise": {
      "kind": "SaaS para el sector automotriz",
      "summary": "Digitaliza datos de clientes, flujos de trabajo y operaciones de servicio de tiendas y talleres automotrices en Portugal. Fui cofundador de la empresa y lideré la plataforma como CTO hasta octubre de 2026."
     },
     "circunomics": {
      "kind": "Pipelines de telemetría de baterías",
      "summary": "Pipelines de datos que procesan miles de gigabytes de telemetría de baterías al día, y sustentan la detección de anomalías, las previsiones y las estimaciones de State of Health."
     }
    }
   },
   "experience": {
    "heading": "Experiencia",
    "timeline": {
     "title": "Trayectoria profesional",
     "currentFull": "Actual, tiempo completo",
     "currentPart": "Actual, tiempo parcial",
     "past": "Cargo anterior"
    },
    "jobs": [
     {
      "id": "roamlii",
      "company": "Roamlii",
      "role": "CTO",
      "period": "Sep 2026 – Presente",
      "location": "Remoto",
      "bullets": [
       "Lidero la tecnología como CTO de una plataforma de turismo canadiense que conecta a operadores independientes, candidatos a trabajos de temporada y viajeros.",
       "Construí el servidor MCP de Roamlii en Python, que lleva el asistente de IA y las funciones de agente de la plataforma a cualquier cliente MCP, con servidores separados para viajeros, operadores y administradores y 65 herramientas.",
       "Diseñé un acceso seguro para la IA: la seguridad a nivel de fila (RLS) de Postgres decide qué puede leer cada usuario, y cada cambio de un operador se convierte en una propuesta que el dueño del negocio revisa antes de aplicarla.",
       "Implementé autenticación basada en Supabase para clientes HTTP y stdio, con los cambios de administración auditados a nombre de quien los hizo.",
       "Construí un paquete de integraciones compartido que normaliza los perfiles de negocio entre plataformas de listados, empezando por Google Maps y Google Business Profile.",
       "Empaqueté el servicio con Docker y Helm para su despliegue en Kubernetes."
      ]
     },
     {
      "id": "movize",
      "company": "Movize.pt",
      "role": "Head of Engineering",
      "period": "Ene 2026 – Presente",
      "location": "Portugal",
      "bullets": [
       "Responsable de todo el código y la infraestructura, y de lo que el equipo desarrolla y cómo lo hace.",
       "Definir y arquitectar toda la infraestructura cloud en Google Cloud, incluyendo Google Kubernetes Engine para orquestación de contenedores y Cloudflare para seguridad y rendimiento en el edge.",
       "Establecer patrones de código, estándares de desarrollo y mejores prácticas técnicas en el equipo de ingeniería.",
       "Liderar la planificación de funcionalidades y asignar trabajo a los miembros del equipo, asegurando la alineación entre los objetivos del producto y la ejecución técnica.",
       "Arquitectar una plataforma de movilidad construida con React Native (Expo) para mobile multiplataforma, FastAPI y Symfony para APIs backend, y Firebase para funcionalidades en tiempo real.",
       "Integrar la API de Google Places para servicios basados en ubicación en la aplicación de movilidad."
      ]
     },
     {
      "id": "driverwise",
      "company": "DriverWise LDA",
      "role": "CTO & Co-Fundador",
      "period": "May 2024 – Oct 2026",
      "location": "Braga, Portugal",
      "bullets": [
       "Lideré el desarrollo y mantenimiento de una plataforma SaaS para tiendas de automóviles y mecánicos en Portugal, permitiendo la digitalización total de datos de clientes, workflows y operaciones de servicio.",
       "Diseñé y desarrollé servicios backend usando Node.js (Express.js) con TypeScript y Prisma.",
       "Construí el frontend en Vue.js 3, entregando una experiencia de usuario moderna e intuitiva.",
       "Integré procesamiento de pagos basado en Symfony para workflows de facturación seguros y automatizados.",
       "Gestioné infraestructura cloud-native con Kubernetes, Docker y GitHub Actions CI/CD.",
       "Coordiné con equipos de desarrollo mobile en apps construidas con Swift (iOS) y Kotlin (Android)."
      ]
     },
     {
      "id": "circunomics",
      "company": "Circunomics GMBH",
      "role": "Ingeniero de Software Senior",
      "period": "Sep 2021 – Presente",
      "location": "Mainz, Alemania",
      "bullets": [
       "Lideró el desarrollo end-to-end de pipelines de datos a gran escala, procesando miles de gigabytes de datos de telemetría de baterías diariamente, habilitando analíticas de detección de anomalías, predicciones y State of Health.",
       "Actuó como líder técnico cross-team, definiendo arquitectura y mejores prácticas para dashboards analíticos y asesorando a equipos de backend y frontend.",
       "Diseñó e implementó pipelines de CI/CD que optimizaron la entrega y mejoraron la velocidad de ingeniería.",
       "Arquitectó toda la infraestructura cloud y containerizada: AWS EKS, ECR, S3 y Route 53.",
       "Estandarizó deployments en Kubernetes usando Helm charts, garantizando reproducibilidad y fiabilidad de nivel de producción.",
       "Lideró la adopción de Docker, garantizando entornos de desarrollo uniformes.",
       "Apoyó el desarrollo de aplicaciones en todo el stack: FastAPI + SQLAlchemy (backend) y Angular (frontend)."
      ]
     },
     {
      "id": "goodlord",
      "company": "Oh Goodlord Ltd",
      "role": "Ingeniero Backend",
      "period": "Nov 2020 – Ago 2021",
      "location": "Londres, Reino Unido",
      "bullets": [
       "Desarrolló y mantuvo la galardonada plataforma de alquileres de Goodlord, garantizando escalabilidad, fiabilidad y enfoque en el usuario.",
       "Lideró el desarrollo de funcionalidades, troubleshooting y optimización de rendimiento en PHP 7, Symfony, Docker, Kubernetes y AWS.",
       "Colaboró con equipos multifuncionales para entregar funcionalidades de alta calidad y mantener la estabilidad del sistema."
      ]
     },
     {
      "id": "futuresynergies",
      "company": "Future Synergies LDA",
      "role": "Ingeniero de Software Senior",
      "period": "Jul 2017 – Oct 2020",
      "location": "Sagres, Portugal (Remoto)",
      "bullets": [
       "Actuó como Lead Software Engineer, supervisando arquitectura, selección de tecnología y diseño de infraestructura.",
       "Seleccionó e implementó el stack tecnológico: PHP 7.2, Laravel 5, MySQL, Redis, Node.js y servicios AWS (EC2, RDS, S3).",
       "Lideró la integración de múltiples APIs de terceros, pasarelas de pago y sistemas de facturación.",
       "Tomó decisiones estratégicas clave sobre frameworks, infraestructura y servicios cloud.",
       "Proporcionó liderazgo técnico y orientó a ingenieros junior."
      ]
     },
     {
      "id": "maciv",
      "company": "Maciv Tecnologias LTDA",
      "role": "Ingeniero de Software",
      "period": "May 2016 – Jun 2017",
      "location": "Torres Vedras, Portugal",
      "bullets": [
       "Contribuyó al desarrollo de ofertas SaaS enfocadas en redes sociales para múltiples clientes.",
       "Construyó y gestionó herramientas internas: software de monitorización de servidores, dashboards analíticos y un sistema de seguimiento de bugs.",
       "Colaboró en la planificación de proyectos, documentación técnica y procesos de deployment."
      ]
     },
     {
      "id": "dateahome",
      "company": "Date A Home LTD",
      "role": "Ingeniero de Software",
      "period": "Jun 2015 – Abr 2016",
      "location": "Londres, Reino Unido (Remoto)",
      "bullets": [
       "Comenzó como developer construyendo un template WordPress personalizado y plugins, avanzando rápidamente a liderar el proyecto.",
       "Desarrolló una plataforma inmobiliaria única usando PHP 5.6 y Laravel 5.1, integrando APIs para listados de propiedades, mapeo y gestión de usuarios.",
       "Supervisó la administración de sistemas, incluyendo configuración de servidores, deployment y gestión de servicio de email."
      ]
     }
    ],
    "commitment": {
     "full": "Tiempo completo",
     "part": "Tiempo parcial, fuera de horario"
    }
   },
   "skills": {
    "heading": "Habilidades & Tecnologías",
    "categories": {
     "Cloud & Infrastructure": "Cloud & Infraestructura",
     "Backend": "Backend",
     "Frontend & Mobile": "Frontend & Mobile",
     "DevOps & Tooling": "DevOps & Herramientas"
    }
   },
   "contact": {
    "heading": "Ponerse en Contacto",
    "text": "Siempre estoy abierto a discutir nuevas oportunidades, proyectos interesantes o simplemente tener una conversación sobre tecnología. Si tienes una pregunta o solo quieres saludar, no dudes en contactarme.",
    "button": "Saludar",
    "copy": "Copiar email",
    "copied": "Copiado"
   }
  },
  "de": {
   "skip": "Zum Inhalt springen",
   "theme": "Farbschema wechseln",
   "language": "Sprache",
   "nav": {
    "about": "Über mich",
    "work": "Projekte",
    "experience": "Erfahrung",
    "skills": "Fähigkeiten",
    "contact": "Kontakt"
   },
   "hero": {
    "title": "Engineering Lead",
    "statement": "Ich baue Cloud-Infrastruktur, Datenpipelines und SaaS-Produkte und leite die Teams, die sie ausliefern.",
    "based": "Wohnhaft in Kaiserslautern, Deutschland. Über 10 Jahre Erfahrung in Backend, Frontend, Mobile und Infrastruktur.",
    "current": "Aktuell",
    "email": "E-Mail schreiben",
    "cv": "Lebenslauf als PDF"
   },
   "about": {
    "heading": "Über Mich",
    "bio": "Ich baue skalierbare, cloud-native Systeme und leite Engineering-Teams, um wirkungsvolle Produkte zu liefern. Mit über 10 Jahren Erfahrung in Backend, Frontend, Mobile und Infrastruktur spezialisiere ich mich auf das Design von Datenpipelines, die Architektur von Cloud-Infrastruktur auf AWS und Google Cloud sowie die Bereitstellung von Full-Stack-SaaS- und Mobilitätsplattformen von Grund auf. Neben meinen Vollzeitstellen habe ich 8 Freelance-Projekte in verschiedenen Branchen abgeliefert.",
    "stats": {
     "years": "Jahre Erfahrung",
     "companies": "Unternehmen",
     "freelance": "Freelance-Projekte",
     "cofounded": "Mitgegründet"
    },
    "langTitle": "Sprachen",
    "languages": [
     {
      "name": "Portugiesisch",
      "level": "Muttersprache"
     },
     {
      "name": "Englisch",
      "level": "C2"
     },
     {
      "name": "Deutsch",
      "level": "A2"
     }
    ]
   },
   "work": {
    "heading": "Ausgewählte Projekte",
    "layers": {
     "mobile": "Mobile",
     "api": "API",
     "backend": "Backend",
     "frontend": "Frontend",
     "realtime": "Echtzeit",
     "location": "Standort",
     "payments": "Zahlungen",
     "infra": "Infrastruktur",
     "delivery": "Auslieferung",
     "ai": "KI",
     "data": "Daten",
     "integrations": "Integrationen"
    },
    "items": {
     "fjordrun": {
      "kind": "Europäische Cloud-Plattform",
      "summary": "Eine europäische Plattform zum Betreiben von Apps: Webdienste, Datenbanken, Cronjobs, Functions und KI-Agenten, bereitgestellt per git push. KI-Agenten können sie über ihren MCP-Server bedienen. Ich gründe sie gerade und baue sie auf, und diese Website läuft darauf."
     },
     "roamlii": {
      "kind": "KI-Plattform für den kanadischen Tourismus",
      "summary": "Anbieter verwalten ihre Einträge und Stellen über einen Assistenten, und Reisende finden, was in der Nähe los ist. Als CTO habe ich den MCP-Server gebaut, der die Plattform für jeden KI-Client öffnet, wobei jede Änderung eines Anbieters von einem Menschen geprüft wird."
     },
     "movize": {
      "kind": "Mobilitätsplattform",
      "summary": "Eine plattformübergreifende Mobilitäts-App und ihr Cloud-Fundament. Ich verantworte die gesamte Codebasis und Infrastruktur sowie, was das Team entwickelt und wie es entwickelt."
     },
     "driverwise": {
      "kind": "SaaS für Kfz-Betriebe",
      "summary": "Digitalisiert Kundendaten, Arbeitsabläufe und Serviceprozesse von Autohäusern und Werkstätten in Portugal. Ich habe das Unternehmen mitgegründet und die Plattform bis Oktober 2026 als CTO geleitet."
     },
     "circunomics": {
      "kind": "Pipelines für Batterie-Telemetrie",
      "summary": "Datenpipelines, die täglich Tausende Gigabyte Batterie-Telemetrie verarbeiten und Anomalieerkennung, Prognosen und State-of-Health-Vorhersagen ermöglichen."
     }
    }
   },
   "experience": {
    "heading": "Erfahrung",
    "timeline": {
     "title": "Beruflicher Werdegang",
     "currentFull": "Aktuell, Vollzeit",
     "currentPart": "Aktuell, nebenberuflich",
     "past": "Frühere Position"
    },
    "jobs": [
     {
      "id": "roamlii",
      "company": "Roamlii",
      "role": "CTO",
      "period": "Sep 2026 – Heute",
      "location": "Remote",
      "bullets": [
       "Technologieverantwortung als CTO einer kanadischen Tourismusplattform, die unabhängige Anbieter, Saisonkräfte und Reisende zusammenbringt.",
       "Entwicklung des Roamlii-MCP-Servers in Python, der den KI-Assistenten und die Agentenfunktionen der Plattform für jeden MCP-Client verfügbar macht, mit getrennten Servern für Reisende, Anbieter und Administratoren und 65 Tools.",
       "Konzeption eines sicheren KI-Zugriffs: Row-Level Security in Postgres legt fest, was jeder Aufrufer lesen darf, und jede Änderung eines Anbieters wird zu einem Vorschlag, den der Betriebsinhaber vor der Übernahme prüft.",
       "Implementierung einer Supabase-basierten Authentifizierung für HTTP- und stdio-Clients, wobei Admin-Änderungen der ausführenden Person zugeordnet und protokolliert werden.",
       "Entwicklung eines gemeinsamen Integrationspakets, das Unternehmensprofile plattformübergreifend vereinheitlicht, zunächst für Google Maps und Google Business Profile.",
       "Paketierung des Dienstes mit Docker und Helm für das Deployment auf Kubernetes."
      ]
     },
     {
      "id": "movize",
      "company": "Movize.pt",
      "role": "Head of Engineering",
      "period": "Jan 2026 – Heute",
      "location": "Portugal",
      "bullets": [
       "Gesamtverantwortung für Codebasis und Infrastruktur sowie dafür, was das Team entwickelt und wie es entwickelt.",
       "Definition und Architektur der gesamten Cloud-Infrastruktur auf Google Cloud, einschließlich Google Kubernetes Engine für Container-Orchestrierung und Cloudflare für Edge-Sicherheit und Performance.",
       "Etablierung von Code-Patterns, Entwicklungsstandards und technischen Best Practices im Engineering-Team.",
       "Leitung der Feature-Planung und Arbeitszuweisung an Teammitglieder, um die Ausrichtung zwischen Produktzielen und technischer Umsetzung sicherzustellen.",
       "Architektur einer Mobilitätsplattform mit React Native (Expo) für plattformübergreifendes Mobile, FastAPI und Symfony für Backend-APIs und Firebase für Echtzeit-Funktionen.",
       "Integration der Google Places API für standortbasierte Dienste in der Mobilitätsanwendung."
      ]
     },
     {
      "id": "driverwise",
      "company": "DriverWise LDA",
      "role": "CTO & Mitgründer",
      "period": "Mai 2024 – Okt 2026",
      "location": "Braga, Portugal",
      "bullets": [
       "Leitung der Entwicklung und Wartung einer SaaS-Plattform für Autohäuser und Werkstätten in Portugal, die die vollständige Digitalisierung von Kundendaten, Workflows und Serviceabläufen ermöglicht.",
       "Architektur und Entwicklung von Backend-Services mit Node.js (Express.js), TypeScript und Prisma.",
       "Entwickelte das Frontend in Vue.js 3 und lieferte ein modernes und intuitives Benutzererlebnis.",
       "Integrierte Symfony-basierte Zahlungsabwicklung für sichere, automatisierte Abrechnungsworkflows.",
       "Verwaltung cloud-nativer Infrastruktur mit Kubernetes, Docker und GitHub Actions CI/CD.",
       "Koordination mit Mobile-Entwicklungsteams für Apps mit Swift (iOS) und Kotlin (Android)."
      ]
     },
     {
      "id": "circunomics",
      "company": "Circunomics GMBH",
      "role": "Senior Software Engineer",
      "period": "Sep 2021 – Heute",
      "location": "Mainz, Deutschland",
      "bullets": [
       "Leitete die End-to-End-Entwicklung hochskalierbarer Datenpipelines, die täglich Tausende Gigabytes an Batterie-Telemetriedaten verarbeiten und Analysen für Anomalieerkennung, Prognosen und State-of-Health-Vorhersagen ermöglichen.",
       "Fungierte als teamübergreifender technischer Leiter, definierte Architektur und Best Practices für Analyse-Dashboards und beriet Backend- und Frontend-Teams.",
       "Entwarf und implementierte CI/CD-Pipelines, die die Auslieferung optimierten und die Engineering-Geschwindigkeit verbesserten.",
       "Architekturierte die gesamte Cloud- und containerisierte Infrastruktur: AWS EKS, ECR, S3 und Route 53.",
       "Standardisierte Kubernetes-Deployments mit Helm Charts und gewährleistete Reproduzierbarkeit und produktionsreife Zuverlässigkeit.",
       "Trieb die Docker-Einführung voran und garantierte einheitliche Entwicklungsumgebungen.",
       "Unterstützte die Anwendungsentwicklung über den gesamten Stack: FastAPI + SQLAlchemy (Backend) und Angular (Frontend)."
      ]
     },
     {
      "id": "goodlord",
      "company": "Oh Goodlord Ltd",
      "role": "Backend-Ingenieur",
      "period": "Nov 2020 – Aug 2021",
      "location": "London, Vereinigtes Königreich",
      "bullets": [
       "Entwickelte und pflegte Goodlords preisgekrönte Vermietungsplattform und gewährleistete Skalierbarkeit, Zuverlässigkeit und Nutzerfokus.",
       "Leitete Feature-Entwicklung, Troubleshooting und Performance-Optimierung über PHP 7, Symfony, Docker, Kubernetes und AWS.",
       "Arbeitete mit funktionsübergreifenden Teams zusammen, um hochwertige Features zu liefern und die Systemstabilität aufrechtzuerhalten."
      ]
     },
     {
      "id": "futuresynergies",
      "company": "Future Synergies LDA",
      "role": "Senior Software Engineer",
      "period": "Jul 2017 – Okt 2020",
      "location": "Sagres, Portugal (Remote)",
      "bullets": [
       "Fungierte als Lead Software Engineer, überwachte Architektur, Technologieauswahl und Infrastrukturdesign.",
       "Wählte den Tech-Stack aus und implementierte ihn: PHP 7.2, Laravel 5, MySQL, Redis, Node.js und AWS-Dienste (EC2, RDS, S3).",
       "Leitete die Integration mehrerer Drittanbieter-APIs, Zahlungsgateways und Rechnungssysteme.",
       "Traf strategische Schlüsselentscheidungen zu Frameworks, Infrastruktur und Cloud-Diensten.",
       "Leistete technische Führung und betreute Junior-Ingenieure."
      ]
     },
     {
      "id": "maciv",
      "company": "Maciv Tecnologias LTDA",
      "role": "Software-Ingenieur",
      "period": "Mai 2016 – Jun 2017",
      "location": "Torres Vedras, Portugal",
      "bullets": [
       "Trug zur Entwicklung von SaaS-Angeboten bei, die sich auf soziale Netzwerke für mehrere Kunden konzentrierten.",
       "Baute und verwaltete interne Tools: Server-Monitoring-Software, Analyse-Dashboards und ein Bug-Tracking-System.",
       "Arbeitete an Projektplanung, technischer Dokumentation und Deployment-Prozessen mit."
      ]
     },
     {
      "id": "dateahome",
      "company": "Date A Home LTD",
      "role": "Software-Ingenieur",
      "period": "Jun 2015 – Apr 2016",
      "location": "London, Vereinigtes Königreich (Remote)",
      "bullets": [
       "Begann als Entwickler mit dem Bau eines individuellen WordPress-Templates und Plugins und übernahm schnell die Projektleitung.",
       "Entwickelte eine einzigartige Immobilienplattform mit PHP 5.6 und Laravel 5.1, integrierte APIs für Immobilienlisten, Kartierung und Benutzerverwaltung.",
       "Übernahm die Systemadministration einschließlich Serverkonfiguration, Deployment und E-Mail-Service-Verwaltung."
      ]
     }
    ],
    "commitment": {
     "full": "Vollzeit",
     "part": "Nebenberuflich"
    }
   },
   "skills": {
    "heading": "Fähigkeiten & Technologien",
    "categories": {
     "Cloud & Infrastructure": "Cloud & Infrastruktur",
     "Backend": "Backend",
     "Frontend & Mobile": "Frontend & Mobile",
     "DevOps & Tooling": "DevOps & Werkzeuge"
    }
   },
   "contact": {
    "heading": "Kontakt aufnehmen",
    "text": "Ich bin immer offen für neue Möglichkeiten, interessante Projekte oder einfach ein Gespräch über Technologie. Ob du eine Frage hast oder einfach Hallo sagen möchtest — melde dich gerne.",
    "button": "Hallo sagen",
    "copy": "E-Mail kopieren",
    "copied": "Kopiert"
   }
  }
 },
 "site": {
  "name": "Carlos Rodrigues",
  "email": "me@crodrigues.pt",
  "website": "www.crodrigues.pt",
  "github": "https://github.com/cxcrodrigues",
  "githubLabel": "github.com/cxcrodrigues"
 },
 "stats": [
  {
   "key": "years",
   "value": "10+"
  },
  {
   "key": "companies",
   "value": "8"
  },
  {
   "key": "freelance",
   "value": "8"
  },
  {
   "key": "cofounded",
   "value": "2"
  }
 ],
 "timeline": {
  "roamlii": {
   "start": "2026-09",
   "end": null,
   "commitment": "part"
  },
  "movize": {
   "start": "2026-01",
   "end": null,
   "commitment": "part"
  },
  "driverwise": {
   "start": "2024-05",
   "end": "2026-10",
   "commitment": "part"
  },
  "circunomics": {
   "start": "2021-09",
   "end": null,
   "commitment": "full"
  },
  "goodlord": {
   "start": "2020-11",
   "end": "2021-08"
  },
  "futuresynergies": {
   "start": "2017-07",
   "end": "2020-10"
  },
  "maciv": {
   "start": "2016-05",
   "end": "2017-06"
  },
  "dateahome": {
   "start": "2015-06",
   "end": "2016-04"
  }
 },
 "projects": [
  {
   "id": "fjordrun",
   "name": "Fjordrun",
   "stack": [
    [
     "ai",
     "MCP server for AI agents"
    ],
    [
     "delivery",
     "Git push deploys, Nixpacks, Dockerfile builds"
    ],
    [
     "data",
     "Managed Postgres, MySQL, Redis, MongoDB"
    ],
    [
     "infra",
     "EU regions: Falkenstein, Nuremberg, Helsinki"
    ]
   ]
  },
  {
   "id": "roamlii",
   "name": "Roamlii",
   "url": "https://roamlii.com",
   "stack": [
    [
     "ai",
     "Model Context Protocol"
    ],
    [
     "backend",
     "Python, Pydantic, Starlette"
    ],
    [
     "data",
     "Supabase Postgres, row-level security"
    ],
    [
     "integrations",
     "Google Maps, Google Business Profile"
    ],
    [
     "infra",
     "Docker, Kubernetes, Helm"
    ]
   ]
  },
  {
   "id": "movize",
   "name": "Movize",
   "stack": [
    [
     "mobile",
     "React Native, Expo"
    ],
    [
     "api",
     "FastAPI, Symfony"
    ],
    [
     "realtime",
     "Firebase"
    ],
    [
     "location",
     "Google Places API"
    ],
    [
     "infra",
     "Google Cloud, GKE, Cloudflare"
    ]
   ]
  },
  {
   "id": "driverwise",
   "name": "DriverWise",
   "stack": [
    [
     "backend",
     "Node.js, Express, TypeScript, Prisma"
    ],
    [
     "frontend",
     "Vue.js 3"
    ],
    [
     "mobile",
     "Swift, Kotlin"
    ],
    [
     "payments",
     "Symfony"
    ],
    [
     "infra",
     "Kubernetes, Docker, GitHub Actions"
    ]
   ]
  },
  {
   "id": "circunomics",
   "name": "Circunomics",
   "stack": [
    [
     "backend",
     "FastAPI, SQLAlchemy"
    ],
    [
     "frontend",
     "Angular"
    ],
    [
     "infra",
     "AWS EKS, ECR, S3, Route 53"
    ],
    [
     "delivery",
     "Helm, Docker, CI/CD"
    ]
   ]
  }
 ],
 "skills": {
  "Cloud & Infrastructure": [
   "Google Cloud",
   "Google Kubernetes Engine",
   "Cloudflare",
   "Firebase",
   "AWS EKS",
   "AWS S3",
   "AWS ECR",
   "AWS Route 53",
   "AWS SQS",
   "AWS EC2",
   "AWS RDS",
   "Azure",
   "Scaleway",
   "Kubernetes",
   "Docker",
   "Helm Charts",
   "Linux"
  ],
  "Backend": [
   "FastAPI",
   "SQLAlchemy",
   "Node.js",
   "Express.js",
   "TypeScript",
   "Prisma",
   "Symfony",
   "PHP",
   "Laravel",
   "Python",
   "Apache Airflow",
   "Model Context Protocol",
   "PostgreSQL",
   "Supabase"
  ],
  "Frontend & Mobile": [
   "React Native",
   "Expo",
   "Vue.js 3",
   "Angular",
   "HTML",
   "CSS",
   "JavaScript"
  ],
  "DevOps & Tooling": [
   "CI/CD",
   "GitHub Actions",
   "Git",
   "Terraform"
  ]
 }
};
