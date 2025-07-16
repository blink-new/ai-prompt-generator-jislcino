import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './components/ui/collapsible'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu'
import { Toaster } from './components/ui/toaster'
import { ChevronDown, Sparkles, Wand2, User, LogOut } from 'lucide-react'
import { PromptTypeSelector } from './components/PromptTypeSelector'
import { ParameterControls } from './components/ParameterControls'
import { GeneratedPromptDisplay } from './components/GeneratedPromptDisplay'
import { PromptHistory } from './components/PromptHistory'
import { QuickTemplates } from './components/QuickTemplates'
import { blink } from './blink/client'
import { GeneratedPrompt, PromptParameters, PromptTemplate } from './types/prompt'
import { 
  promptTypes, 
  toneOptions, 
  styleOptions, 
  lengthOptions, 
  complexityOptions,
  promptTemplates 
} from './data/promptTypes'
import { useToast } from './hooks/use-toast'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('creative-writing')
  const [topic, setTopic] = useState('')
  const [parameters, setParameters] = useState<PromptParameters>({
    tone: 'Professional',
    style: 'Descriptive',
    length: 'Medium',
    complexity: 'Intermediate'
  })
  const [currentPrompt, setCurrentPrompt] = useState<GeneratedPrompt | null>(null)
  const [promptHistory, setPromptHistory] = useState<GeneratedPrompt[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleParameterChange = (key: keyof PromptParameters, value: string) => {
    setParameters(prev => ({ ...prev, [key]: value }))
  }

  const generatePrompt = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your prompt",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    
    try {
      const promptContext = `Generate a ${parameters.tone.toLowerCase()} ${selectedType.replace('-', ' ')} prompt about "${topic}" with the following specifications:
      - Style: ${parameters.style}
      - Length: ${parameters.length}
      - Complexity: ${parameters.complexity}
      
      Make it creative, engaging, and specific. The prompt should be ready to use with AI models.`

      const { text } = await blink.ai.generateText({
        prompt: promptContext,
        model: 'gpt-4o-mini',
        maxTokens: 300
      })

      const newPrompt: GeneratedPrompt = {
        id: `prompt_${Date.now()}`,
        content: text,
        type: selectedType,
        parameters: { ...parameters },
        topic,
        createdAt: new Date(),
        isFavorite: false
      }

      setCurrentPrompt(newPrompt)
      setPromptHistory(prev => [newPrompt, ...prev])
      
      toast({
        title: "Prompt generated!",
        description: "Your AI prompt is ready to use",
      })
    } catch (error) {
      console.error('Error generating prompt:', error)
      toast({
        title: "Generation failed",
        description: "Failed to generate prompt. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = () => {
    generatePrompt()
  }

  const handleToggleFavorite = (promptId: string) => {
    setPromptHistory(prev => 
      prev.map(prompt => 
        prompt.id === promptId 
          ? { ...prompt, isFavorite: !prompt.isFavorite }
          : prompt
      )
    )
    
    if (currentPrompt?.id === promptId) {
      setCurrentPrompt(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null)
    }
  }

  const handleDeletePrompt = (promptId: string) => {
    setPromptHistory(prev => prev.filter(prompt => prompt.id !== promptId))
    if (currentPrompt?.id === promptId) {
      setCurrentPrompt(null)
    }
  }

  const handleSelectPrompt = (prompt: GeneratedPrompt) => {
    setCurrentPrompt(prompt)
    setSelectedType(prompt.type)
    setTopic(prompt.topic)
    setParameters(prompt.parameters)
  }

  const handleSelectTemplate = (template: PromptTemplate) => {
    setSelectedType(template.type)
    setTopic('')
    // Set default parameters based on template
    setParameters({
      tone: 'Professional',
      style: 'Descriptive',
      length: 'Medium',
      complexity: 'Intermediate'
    })
    toast({
      title: "Template selected",
      description: `Using ${template.name} template`,
    })
  }

  const handleLogout = () => {
    blink.auth.logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Wand2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Welcome to AI Prompt Generator</h2>
            <p className="text-muted-foreground mb-4">
              Please sign in to start generating creative prompts
            </p>
            <Button onClick={() => blink.auth.login()}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative mb-8">
          {/* User Menu */}
          <div className="absolute top-0 right-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Title and Description */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold text-foreground">AI Prompt Generator</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Generate creative and effective prompts for AI models, chatbots, and creative writing tasks
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Type Selection */}
            <PromptTypeSelector
              promptTypes={promptTypes}
              selectedType={selectedType}
              onTypeSelect={setSelectedType}
            />

            {/* Topic Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enter Your Topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">What would you like to create a prompt about?</Label>
                  <Textarea
                    id="topic"
                    placeholder="e.g., A mysterious forest, Building a mobile app, Marketing strategy for startups..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parameter Controls */}
            <ParameterControls
              parameters={parameters}
              onParameterChange={handleParameterChange}
              toneOptions={toneOptions}
              styleOptions={styleOptions}
              lengthOptions={lengthOptions}
              complexityOptions={complexityOptions}
            />

            {/* Advanced Options */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between">
                  Advanced Options
                  <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="mt-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="context">Additional Context (Optional)</Label>
                        <Textarea
                          id="context"
                          placeholder="Any additional context or specific requirements..."
                          className="min-h-[80px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={generatePrompt}
                disabled={isGenerating || !topic.trim()}
                size="lg"
                className="px-8"
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Prompt
                  </>
                )}
              </Button>
            </div>

            {/* Generated Prompt Display */}
            <GeneratedPromptDisplay
              prompt={currentPrompt}
              isGenerating={isGenerating}
              onRegenerate={handleRegenerate}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Templates */}
            <QuickTemplates
              templates={promptTemplates}
              onSelectTemplate={handleSelectTemplate}
            />

            {/* Prompt History */}
            <PromptHistory
              prompts={promptHistory}
              onSelectPrompt={handleSelectPrompt}
              onToggleFavorite={handleToggleFavorite}
              onDeletePrompt={handleDeletePrompt}
            />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App