import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Label } from './ui/label'
import { PromptParameters } from '../types/prompt'

interface ParameterControlsProps {
  parameters: PromptParameters
  onParameterChange: (key: keyof PromptParameters, value: string) => void
  toneOptions: string[]
  styleOptions: string[]
  lengthOptions: string[]
  complexityOptions: string[]
}

export function ParameterControls({
  parameters,
  onParameterChange,
  toneOptions,
  styleOptions,
  lengthOptions,
  complexityOptions
}: ParameterControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Customize Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select value={parameters.tone} onValueChange={(value) => onParameterChange('tone', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {toneOptions.map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={parameters.style} onValueChange={(value) => onParameterChange('style', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                {styleOptions.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Select value={parameters.length} onValueChange={(value) => onParameterChange('length', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                {lengthOptions.map((length) => (
                  <SelectItem key={length} value={length}>
                    {length}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complexity">Complexity</Label>
            <Select value={parameters.complexity} onValueChange={(value) => onParameterChange('complexity', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                {complexityOptions.map((complexity) => (
                  <SelectItem key={complexity} value={complexity}>
                    {complexity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}