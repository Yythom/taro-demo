import { useLayoutEffect, useMemo, useState } from "react";

function useCheck<L>(initList: L[] | undefined,): {
	list: L[],
	check: (index: number) => void,
	total_checked: L[],
} {
	const [list, setList] = useState<L[]>([]);
	const total_checked = useMemo(() => list.filter((el: any) => el.checked), [list])
	useLayoutEffect(() => {
		initList && setList(initList);
	}, [initList])

	const check_item = (index: number) => {
		const $list = JSON.parse(JSON.stringify(list));
		if ($list[index].checked) {
			$list[index].checked = false
		} else {
			$list[index].checked = true
		}
		setList($list)
	}

	return {
		list,
		check: check_item,
		total_checked,
	}
}
export default useCheck;