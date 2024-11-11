import { Send } from "lucide-react";

interface VariableFormProps {
	variables: Record<string, string>;
	onVariableChange: (key: string, value: string) => void;
	onGenerate: () => void;
}

export function VariableForm({
	variables,
	onVariableChange,
	onGenerate,
}: VariableFormProps) {
	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold text-gray-700">変数入力</h2>
			<div className="grid gap-4 md:grid-cols-2">
				{Object.entries(variables).map(([key, value]) => (
					<div key={key} className="space-y-1">
						<label className="block text-sm font-medium text-gray-700">
							{key}
						</label>
						<input
							type="text"
							value={value}
							onChange={(e) => onVariableChange(key, e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder={`${key}の値を入力`}
						/>
					</div>
				))}
			</div>

			<button
				onClick={onGenerate}
				className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
			>
				<Send className="h-4 w-4" />
				生成する
			</button>
		</div>
	);
}
