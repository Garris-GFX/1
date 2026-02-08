
let _savedOverflowX: string | null = null;
let _savedOverflow: string | null = null;

export function lockBodyOverflowX() {
	if (typeof document === 'undefined') return;
	try {
		_savedOverflowX = document.body.style.overflowX ?? null;
		document.body.style.overflowX = 'hidden';
	} catch (e) {
		/* noop */
	}
}

export function unlockBodyOverflowX() {
	if (typeof document === 'undefined') return;
	try {
		if (_savedOverflowX === null) document.body.style.removeProperty('overflow-x');
		else document.body.style.overflowX = _savedOverflowX;
		_savedOverflowX = null;
	} catch (e) {
		/* noop */
	}
}

// General scroll lock (both axes) expected by some components
export function lockBodyScroll() {
	if (typeof document === 'undefined') return;
	try {
		_savedOverflow = document.body.style.overflow ?? null;
		document.body.style.overflow = 'hidden';
	} catch (e) {
		/* noop */
	}
}

export function unlockBodyScroll() {
	if (typeof document === 'undefined') return;
	try {
		if (_savedOverflow === null) document.body.style.removeProperty('overflow');
		else document.body.style.overflow = _savedOverflow;
		_savedOverflow = null;
	} catch (e) {
		/* noop */
	}
}
