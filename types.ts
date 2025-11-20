export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  image: string;
  isFlagship?: boolean;
  stats?: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  isTyping?: boolean;
}