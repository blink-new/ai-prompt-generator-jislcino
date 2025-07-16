import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { PromptType } from '../types/prompt'

interface PromptTypeSelectorProps {
  promptTypes: PromptType[]
  selectedType: string
  onTypeSelect: (typeId: string) => void
}

export function PromptTypeSelector({ promptTypes, selectedType, onTypeSelect }: PromptTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Choose Prompt Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {promptTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedType === type.id
                ? 'ring-2 ring-primary border-primary bg-primary/5'
                : 'hover:border-primary/50'
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{type.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{type.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                  {selectedType === type.id && (
                    <Badge variant="default" className="mt-2">
                      Selected
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}