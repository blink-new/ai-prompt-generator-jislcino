export interface PromptType {
  id: string
  name: string
  description: string
  icon: string
}

export interface PromptParameters {
  tone: string
  style: string
  length: string
  complexity: string
}

export interface GeneratedPrompt {
  id: string
  content: string
  type: string
  parameters: PromptParameters
  topic: string
  createdAt: Date
  isFavorite?: boolean
}

export interface PromptTemplate {
  id: string
  name: string
  description: string
  type: string
  template: string
}