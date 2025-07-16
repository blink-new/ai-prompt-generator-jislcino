import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ScrollArea } from './ui/scroll-area'
import { Copy, Heart, Trash2 } from 'lucide-react'
import { GeneratedPrompt } from '../types/prompt'
import { useToast } from '../hooks/use-toast'

interface PromptHistoryProps {
  prompts: GeneratedPrompt[]
  onSelectPrompt: (prompt: GeneratedPrompt) => void
  onToggleFavorite: (promptId: string) => void
  onDeletePrompt: (promptId: string) => void
}

export function PromptHistory({
  prompts,
  onSelectPrompt,
  onToggleFavorite,
  onDeletePrompt
}: PromptHistoryProps) {
  const { toast } = useToast()

  const handleCopy = async (content: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      })
    }
  }

  const handleDelete = (promptId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onDeletePrompt(promptId)
  }

  const handleToggleFavorite = (promptId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(promptId)
  }

  if (prompts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Prompt History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-3xl mb-2">📝</div>
            <p className="text-muted-foreground">No prompts generated yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Prompt History
          <Badge variant="secondary">{prompts.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {prompts.map((prompt) => (
              <div
                key={prompt.id}
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onSelectPrompt(prompt)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {prompt.type.replace('-', ' ')}
                    </Badge>
                    {prompt.isFavorite && (
                      <Heart className="h-3 w-3 text-red-500 fill-current" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => handleToggleFavorite(prompt.id, e)}
                    >
                      <Heart className={`h-3 w-3 ${prompt.isFavorite ? 'text-red-500 fill-current' : 'text-muted-foreground'}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => handleCopy(prompt.content, e)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      onClick={(e) => handleDelete(prompt.id, e)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-foreground line-clamp-2 mb-2">
                  {prompt.content}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Topic: {prompt.topic}</span>
                  <span>{prompt.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}