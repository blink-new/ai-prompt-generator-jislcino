import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { PromptTemplate } from '../types/prompt'

interface QuickTemplatesProps {
  templates: PromptTemplate[]
  onSelectTemplate: (template: PromptTemplate) => void
}

export function QuickTemplates({ templates, onSelectTemplate }: QuickTemplatesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onSelectTemplate(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm">{template.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {template.type.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                {template.description}
              </p>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                Use Template
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}