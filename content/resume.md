---
name: Ronny Badilla
positioning: Site Reliability + Platform Engineering
expertise:
  - key: Observability
    value: Prometheus, Grafana, ELK, New Relic. Operational, security, and cost data in one data plane.
  - key: Response
    value: On-call operations, self-healing for Kubernetes workloads, automated triage, timed escalation playbooks.
  - key: Release
    value: CI/CD gates, deployment readiness, registry promotion rules, branch-isolated previews.
  - key: Automation
    value: Policy as code, serverless checks and remediation, GitOps with ArgoCD and Helm.
  - key: Infrastructure
    value: AWS, Kubernetes, Terraform modules, EventBridge, Step Functions, OpenSearch.
  - key: Cost
    value: Cost and Usage Reports, cost controls, spend limits per agent session.
  - key: Agents
    value: Hallucination and bias evals, tool scoping, human oversight, traceability.
  - key: Compliance
    value: Controls with an owner and evidence. FedRAMP-related requirements, SOC 2, GDPR.
  - key: Languages
    value: TypeScript, Python, Go, Bash and POSIX shell.
experience:
  - organization: SynerOps
    role: Founder. Agent and web technology practice
    period: 2025–now
    bullets:
      - Built an agent-assisted platform engineering method. Agents propose versioned playbooks, people approve, approved guidance runs in delivery and operations.
  - organization: TransUnion
    role: Senior Site Reliability Engineer. Project-based
    period: 2023–2026
    bullets:
      - Built self-healing for Kubernetes workloads with a dedicated team. An agent correlated the last deployment, health checks, logs, saturation, and dependency health, then restarted, scaled, drained the node, or escalated to a person.
      - Kubernetes alert volume fell to a very low level, and the result earned the team more budget for AI work.
      - Operated Kubernetes clusters across regions and environments with GitOps on ArgoCD, and ran blue-green cluster upgrades in night-time windows.
      - Served in the on-call rotation, wrote internal Terraform modules with the platform team, and built delivery controls that stopped a deployment before execution when it did not meet its team's playbook.
      - Took on an additional product engineering role bringing AI into the company. Semantic search, an analytics agent, and an agentic status page in internal production use.
      - Defined the governance program for those models and agents, with a gate at every stage from intake to retirement and an owner and evidence for every control.
  - organization: Automattic, Openverse
    role: Infrastructure Engineer. Project-based, eleven months
    period: "2023"
    bullets:
      - Built Openverse's AWS platform from scratch, migrated the open-source search engine to it, and introduced branch-isolated previews across code, workflows, and data.
  - organization: SynerOps
    role: Founder. Cloud consulting practice
    period: 2021–2024
    bullets:
      - Built an observability, DevSecOps, and compliance platform for microservice estates at two enterprises, with operational, security, and cost data in one AWS data plane.
      - Routed security findings through EventBridge and Step Functions into automated triage, evidence collection, ServiceNow tickets, and timed escalation to the on-call team, inside a one-hour notification window.
      - Built a policy-as-code platform on Cloud Custodian. Serverless policy checks and remediation under FedRAMP-related requirements, customer isolation for SOC 2 and GDPR.
  - organization: SoftwareONE
    role: AWS consulting practice
    period: 2018–2022
    bullets:
      - Helped establish the AWS consulting practice, built a cost-control and governance solution on Cost and Usage Reports, and led due diligence for two acquisitions.
  - organization: DNAMIC, Arena Edge
    role: Product team lead
    period: 2015–2017
    bullets:
      - Led a dedicated product team for a video and learning platform on AWS.
openSource:
  - label: dot
    href: https://github.com/rbadillap/dotfiles
    note: Your Mac, as code. Check and apply, in POSIX shell.
  - label: paperops
    href: https://github.com/rbadillap/paperops
    note: Observability and budgets for every agent call in Paper.
  - label: ai-gateways-benchmark
    href: https://github.com/rbadillap/ai-gateways-benchmark
    note: AI gateway latency, phase by phase.
  - label: GitHub
    href: https://github.com/rbadillap
    note: The complete project catalog.
---

I keep production reliable by automating the operational work: self-healing for Kubernetes, triage and escalation, the gates a change passes before it ships, and infrastructure as code. That automation is how I came to bring agents into production, with evals, budgets, and human approval as the controls.
