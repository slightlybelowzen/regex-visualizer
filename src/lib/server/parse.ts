export interface AST {
	input: string;
	regex: string;
}

export function parse(regex: string, input: string): AST {
	return { input: input, regex: regex };
}
