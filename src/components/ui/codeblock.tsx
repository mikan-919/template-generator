import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Highlight, themes } from "prism-react-renderer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLPreElement> {
  code: string
  language: string
  asChild?: boolean
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ code, language, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "pre"
    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = () => {
      navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          "relative rounded-md bg-muted font-mono text-sm",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <span className="text-xs text-muted-foreground">{language}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </Button>
        </div>
        <Highlight theme={themes.vsDark} code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={cn("p-4 overflow-x-auto", className)} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </Comp>
    )
  }
)
CodeBlock.displayName = "CodeBlock"

export { CodeBlock }