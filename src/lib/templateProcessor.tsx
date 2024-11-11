export interface TemplateVariables {
	[key: string]: string;
}

export class TemplateProcessor {
	private static readonly VARIABLE_REGEX = /(?<!\\)\$\{([^}]+)\}/g;

	static extractVariables(template: string): TemplateVariables {
		const matches = [...template.matchAll(this.VARIABLE_REGEX)];
		const variables: TemplateVariables = {};

		matches.forEach((match) => {
			const varName = match[1];
			if (!variables[varName]) {
				variables[varName] = "";
			}
		});

		return variables;
	}

	static processTemplate(
		template: string,
		variables: TemplateVariables,
	): string {
		return template.replace(this.VARIABLE_REGEX, (match, varName) => {
			return variables[varName] || match;
		});
	}
}
