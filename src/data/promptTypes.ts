import { PromptType, PromptTemplate } from '../types/prompt'

export const promptTypes: PromptType[] = [
  {
    id: 'creative-writing',
    name: 'Creative Writing',
    description: 'Stories, poems, and creative content',
    icon: '✍️'
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    description: 'Conversational AI and assistant prompts',
    icon: '🤖'
  },
  {
    id: 'image-generation',
    name: 'Image Generation',
    description: 'Visual art and image creation prompts',
    icon: '🎨'
  },
  {
    id: 'code',
    name: 'Code',
    description: 'Programming and development tasks',
    icon: '💻'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Marketing, strategy, and professional content',
    icon: '💼'
  }
]

export const toneOptions = [
  'Professional', 'Casual', 'Friendly', 'Formal', 'Creative', 
  'Humorous', 'Serious', 'Enthusiastic', 'Calm', 'Authoritative'
]

export const styleOptions = [
  'Descriptive', 'Concise', 'Detailed', 'Simple', 'Complex',
  'Technical', 'Conversational', 'Academic', 'Storytelling', 'Direct'
]

export const lengthOptions = [
  'Short', 'Medium', 'Long', 'Very Long'
]

export const complexityOptions = [
  'Beginner', 'Intermediate', 'Advanced', 'Expert'
]

export const promptTemplates: PromptTemplate[] = [
  {
    id: 'story-starter',
    name: 'Story Starter',
    description: 'Creative writing prompt for stories',
    type: 'creative-writing',
    template: 'Write a compelling story beginning about {topic} with a {tone} tone'
  },
  {
    id: 'chatbot-persona',
    name: 'Chatbot Persona',
    description: 'Define a chatbot personality',
    type: 'chatbot',
    template: 'Create a {tone} chatbot that specializes in {topic} and responds in a {style} manner'
  },
  {
    id: 'image-prompt',
    name: 'Image Description',
    description: 'Detailed image generation prompt',
    type: 'image-generation',
    template: 'Generate a {style} image of {topic} with {tone} mood and {complexity} level of detail'
  },
  {
    id: 'code-task',
    name: 'Coding Task',
    description: 'Programming assignment prompt',
    type: 'code',
    template: 'Write {complexity} level code for {topic} using {style} approach with {tone} documentation'
  },
  {
    id: 'marketing-copy',
    name: 'Marketing Copy',
    description: 'Business marketing content',
    type: 'business',
    template: 'Create {tone} marketing copy for {topic} in a {style} format targeting {complexity} audience'
  }
]