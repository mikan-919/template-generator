export function levenshteinDistance(str1: string, str2: string) {
	const x = str1.length;
	const y = str2.length;
	const d: number[][] = [];

	for (let i = 0; i <= x; i++) {
		d[i] = [];
		d[i][0] = i;
	}
	for (let j = 0; j <= y; j++) {
		d[0][j] = j;
	}

	for (let i = 1; i <= x; i++) {
		for (let j = 1; j <= y; j++) {
			const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
			d[i][j] = Math.min(
				d[i - 1][j] + 1, // 削除
				d[i][j - 1] + 1, // 挿入
				d[i - 1][j - 1] + cost, // 置換
			);
		}
	}
	return d[x][y];
}
