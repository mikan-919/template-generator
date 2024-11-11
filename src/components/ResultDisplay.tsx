import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ResultDisplayProps {
	result: string;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) return null;
	const [copied, setCopied] = useState(false)
	const copyToClipboard = () => {
		navigator.clipboard.writeText(result)
		setCopied(true)
		setTimeout(() => setCopied(false), 4000)
	}
	return (
		<>
			<div className="w-full">
				<Separator className="my-2" />
				<h2 className="scroll-m-20 text-2xl my-6 font-semibold tracking-tight">結果</h2>
				<div className="flex max-h-[650px] overflow-x-auto rounded-lg border bg-muted w-full">
					<pre className="relative text-muted-foreground p-4 w-full text-sm">{result}</pre>
					<Button
						variant="outline"
						size="icon"
						className="size-9 mt-2 mr-2"
						onClick={copyToClipboard}
					>
						{copied ? (
							<Check className="size-4" />
						) : (
							<Copy className="size-4" />
						)}
						<span className="sr-only">Copy code</span>
					</Button>
				</div>
			</div></>
	);
}
