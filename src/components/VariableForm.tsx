import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
			<h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">変数入力</h2>
			<div className="grid gap-4 md:grid-cols-2">
				{Object.entries(variables).map(([key, value]) => (
					<div key={key} className="space-y-1">
						<Label >
							{key}
						</Label>
						<Input
							type="text"
							value={value}
							onChange={(e) => onVariableChange(key, e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder={`${key}の値を入力`}
						/>
					</div>
				))}
			</div>

			<Button
				onClick={onGenerate}
				className="w-full"
			>
				<Send className="h-4 w-4" />
				生成する
			</Button>
		</div>
	);
}
