interface ResultDisplayProps {
	result: string;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
	if (!result) return null;

	return (
		<div className="mt-6">
			<h2 className="text-lg font-semibold text-gray-700 mb-2">結果</h2>
			<div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
				<p className="text-gray-800 whitespace-pre-wrap">{result}</p>
			</div>
		</div>
	);
}
