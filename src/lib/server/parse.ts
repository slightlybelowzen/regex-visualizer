enum TokenType {
	Group = 'Group',
	Bracket = 'Bracket',
	Or = 'Or',
	Repeat = 'Repeat',
	Literal = 'Literal',
	GroupUncaptured = 'GroupUncaptured'
}

interface Token {
	type: TokenType;
	value: Object;
}

export interface ParseContext {
	pos: number;
	tokens: Token[];
}

function parseRegex(regex: string): ParseContext {
	let context: ParseContext = { pos: 0, tokens: [] };
	while (context.pos < regex.length) {
		process(regex, context);
		context.pos++;
	}
	return context;
}

function process(regex: string, context: ParseContext) {
	const ch = regex[context.pos];
	switch (ch) {
		case '(':
			let groupContext: ParseContext = { pos: context.pos, tokens: [] };
			parseGroup(regex, groupContext);
			context.tokens.push({ type: TokenType.Group, value: groupContext.tokens });
			break;
		// case '[':
		// 	parseBracket(regex, context);
		// 	break;
		case '|':
			parseOr(regex, context);
			break;
		case '*':
		case '+':
			parseRepeat(regex, context);
			break;
		default:
			const token: Token = { type: TokenType.Literal, value: ch };
			context.tokens.push(token);
	}
}

function parseOr(regex: string, context: ParseContext) {
	let rhsContext: ParseContext = { pos: context.pos, tokens: [] };
	rhsContext.pos++;
	while (rhsContext.pos < regex.length && regex[rhsContext.pos] != ')') {
		process(regex, rhsContext);
		rhsContext.pos++;
	}
	let left = { type: TokenType.GroupUncaptured, value: context.tokens };
	let right = { type: TokenType.GroupUncaptured, value: rhsContext.tokens };
	context.pos = rhsContext.pos;
	context.tokens = [left, right];
}

function parseRepeat(regex: string, context: ParseContext) {
	const ch = regex[context.pos];
	let max, min;
	switch (ch) {
		case '*':
			max = -1;
			min = 0;
			break;
		case '+':
			max = -1;
			min = 1;
			break;
		case '?':
			max = 1;
			min = 0;
			break;
		default:
			throw new Error('Invalid repeat operator');
	}
	let lastToken = context.tokens[context.tokens.length - 1];
	context.tokens[context.tokens.length - 1] = {
		type: TokenType.Repeat,
		value: { min: min, max: max, token: lastToken }
	};
}

function parseGroup(regex: string, context: ParseContext) {
	context.pos++;
	while (regex[context.pos] != ')') {
		process(regex, context);
		context.pos++;
	}
}

export function parse(regex: string, input: string): ParseContext {
	return parseRegex(regex);
}
