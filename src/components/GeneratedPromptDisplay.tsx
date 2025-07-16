import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Copy, RefreshCw, Heart, Check } from 'lucide-react'
import { GeneratedPrompt } from '../types/prompt'
import { useToast } from '../hooks/use-toast'

interface GeneratedPromptDisplayProps {
  prompt: GeneratedPrompt | null
  isGenerating: boolean
  onRegenerate: () => void
  onToggleFavorite: (promptId: string) => void
}

export function GeneratedPromptDisplay({
  prompt,
  isGenerating,
  onRegenerate,
  onToggleFavorite
}: GeneratedPromptDisplayProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = async () => {
    if (!prompt) return
    
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      })
    }
  }

  if (isGenerating) {
    return (
      <Card className="animate-pulse-slow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Generating your prompt...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!prompt) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Ready to generate your prompt
          </h3>
          <p className="text-sm text-muted-foreground">
            Select a prompt type, enter your topic, and click generate to get started
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">Generated Prompt</CardTitle>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="secondary">{prompt.type.replace('-', ' ')}</Badge>
              <Badge variant="outline">{prompt.parameters.tone}</Badge>
              <Badge variant="outline">{prompt.parameters.style}</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(prompt.id)}
              className={prompt.isFavorite ? 'text-red-500' : 'text-muted-foreground'}
            >
              <Heart className={`h-4 w-4 ${prompt.isFavorite ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={onRegenerate}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 rounded-lg p-4 border">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {prompt.content}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Topic: {prompt.topic}</span>
          <span>{prompt.createdAt.toLocaleTimeString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}