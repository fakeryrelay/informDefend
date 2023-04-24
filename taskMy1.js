// 
const form1DOMElement = document.querySelector('#form-task1')
const btn1DOMElement = document.querySelector('#btn-task1')
const output1DOMElement = document.querySelector('#output1')

// Берем значения


btn1DOMElement.addEventListener('click', () => {
	let alphabet = form1DOMElement.querySelector('#A0').value.split('')
	let alphabetReplaced = form1DOMElement.querySelector('#A1').value.split('')
	let stringMain = form1DOMElement.querySelector('#T0').value
		.replaceAll(' ', '_')
		.replaceAll('й', 'и')
		.toUpperCase()
	let k1 = Number(form1DOMElement.querySelector('#k1').value)
	let k2 = Number(form1DOMElement.querySelector('#k2').value)
	let b = Number(form1DOMElement.querySelector('#b').value)

	const alpabetIndex = arr => arr.map(el => {
		for (let i = 0; i < alphabet.length; i++) {
			if (el === alphabet[i]) {
				return i + 1
			}
		}
	})
	
	const shifrIndex = arrayOfIndex => arrayOfIndex.map(el => (k1 * el + k2) % alphabet.length)
	
	const shifrLetters = (arrOfReplacedLetter, arrOfNewIndex) => arrOfNewIndex.map(el => {
		if (el === 0) {
			return arrOfReplacedLetter[31]
		}
	
		return arrOfReplacedLetter[el - 1]
	})
	
	const splitString = str => {
		const result = []
	
		for (let i = 0; i < str.length; i += b) {
			result.push(str.substring(i, i + b))
		}
	
		return result.map(el => {
			if (el.length < b) {
				el = el + '*'.repeat(b - el.length)
			}
	
			return el
		}).join(' ')
	}
	
	


	// Получаем таблицу значений
	const tableS0 = alphabet
	const tableH0 = alpabetIndex(tableS0)
	const tableH1 = shifrIndex(tableH0, k1, k2)
	const tableS1 = shifrLetters(alphabetReplaced, tableH1)

	// Шифруем строку

	const arrOfMainStr = stringMain.split('')
	const arrOfIndex = alpabetIndex(arrOfMainStr, k1, k2)
	const arrOfReplacedIndex = shifrIndex(arrOfIndex)
	const arrOfReplaycedLetters = shifrLetters(alphabetReplaced, arrOfReplacedIndex)

	const resultString = splitString(arrOfReplaycedLetters.join(''))

	// Делаем вывод
	function createTableString(arr, title) {
		return `
		<tr>
		<td class="td__title">${title}</td>
			${arr.map(el => `<td>${el}</td>`).join('')}
		</tr>`
	}

	function createOutput() {
		let output = output1DOMElement
		let title = '<h2 class="output__title">Таблица замены</h2>'
		let title2 = '<h2 class="output__title">Алгоритм замены</h2>'

		output.innerHTML = `
		${title}
		<table>
			${createTableString(tableS0, 'S0i')}
			${createTableString(tableH0, 'H0i')}
			${createTableString(tableS1, 'S1i')}
			${createTableString(tableH1, 'H1i')}
		</table>
		<br>
		${title2}
		<div class="table__wrapper">
			<table>
				${createTableString(arrOfMainStr, 'T0')}
				${createTableString(arrOfIndex, 'L0h')}
				${createTableString(arrOfReplacedIndex, 'L1h')}
				${createTableString(arrOfReplaycedLetters, 'T1')}
			</table>
		</div>

		<p class="output__result"><b>Резульат:</b> ${resultString}</p>
		`

		return output
	}

	createOutput()

	// console.log(createTableString(alphabet))
})









