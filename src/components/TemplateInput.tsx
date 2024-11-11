import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TemplateInputProps {
	template: string;
	onChange: (template: string) => void;
}

export function TemplateInput({ template, onChange }: TemplateInputProps) {
	return (
		<div className="grid w-full gap-1.5">
			<Label>テンプレート</Label>
			<Textarea
				value={template}
				onChange={(e) => {
					e.target.style.height = "auto";
					e.target.style.height = `${e.target.scrollHeight + 4}px`;
					onChange(e.target.value);
				}}
				className=" resize-none"
				placeholder="例: こんにちは ${名前}さん！"
			/>
			<p className="text-sm text-muted-foreground">
				このテキストはサーバーに送信されません
			</p>
		</div>
	);
}
