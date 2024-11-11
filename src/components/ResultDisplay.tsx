interface ResultDisplayProps {
	result: string;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) return null;

	return (
		<div className="mt-6">
			<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">結果</h2>
			<div className="mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-muted py-4">
				<pre className="relative text-muted-foreground px-[0.3rem] py-[0.2rem] text-base">{result}</pre>
			</div>
		</div>
	);
}
