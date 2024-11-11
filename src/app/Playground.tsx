"use client";
import { useState, useEffect, useCallback } from "react";
import { TemplateInput } from "@/components/TemplateInput";
import { VariableForm } from "@/components/VariableForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { TemplateProcessor, TemplateVariables } from "@/lib/templateProcessor";
import { Separator } from "@/components/ui/separator"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { levenshteinDistance } from "@/lib/levenshtein";
const MAX_DISTANCE = 4;
export default function Playground() {
	const [template, setTemplate] = useState("");
	const [variables, setVariables] = useState<TemplateVariables>({});
	const [result, setResult] = useState("");
	const [textHistory, setTextHistory] = useState<string[]>([]);

	useEffect(() => {
		const storedData = localStorage.getItem("textHistory");
		if (storedData) {
			const structuredData = JSON.parse(storedData);
			const lastTemplate = structuredData.at(-1)
			setTextHistory(structuredData);
			setTemplate(lastTemplate);
			const vars = TemplateProcessor.extractVariables(lastTemplate);
			setVariables((prevVars) => {
				const newVars: TemplateVariables = {};
				Object.keys(vars).forEach((key) => {
					newVars[key] = prevVars[key] || "";
				});
				return newVars;
			});
		} else {
			console.log(textHistory);
		}
	}, []);
	useEffect(() => {
		const intervalID = setInterval(() => {
			if (!template.trim()) return;
			if (template === textHistory.at(-1)) return;
			console.log(`[SAVED] ${template}`);

			setTextHistory((prev) => {
				const res = [...prev, template];
				localStorage.setItem("textHistory", JSON.stringify(res));
				return res;
			});
		}, 1000);
		return () => clearInterval(intervalID);
	}, [textHistory, template]);
	const onChangeTemplate = (newTemplate: string) => {
		const vars = TemplateProcessor.extractVariables(newTemplate);
		setTemplate(newTemplate);
		setVariables((prevVars) => {
			const newVars: TemplateVariables = {};
			Object.keys(vars).forEach((key) => {
				newVars[key] = prevVars[key] || "";
			});
			return newVars;
		});
	};

	const handleVariableChange = (key: string, value: string) => {
		setVariables((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const generateResult = () => {
		const output = TemplateProcessor.processTemplate(template, variables);
		setResult(output);
	};

	return (
		<Card className="max-w-screen-lg mx-auto">
			<CardHeader>
				<CardTitle>テンプレートジェネレーターを試す
				</CardTitle>
				<CardDescription>気軽に試せる場所</CardDescription>
			</CardHeader>
			<CardContent>
				<TemplateInput template={template} onChange={onChangeTemplate} />
				<Separator className="my-4" />

				{Object.keys(variables).length > 0 && (
					<VariableForm
						variables={variables}
						onVariableChange={handleVariableChange}
						onGenerate={generateResult}
					/>
				)}
			</CardContent>
			<CardFooter>
				<ResultDisplay result={result} />
			</CardFooter>
		</Card>
	);
}
