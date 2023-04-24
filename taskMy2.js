const form2DOMElement = document.querySelector('#form-task2')
const btn2DOMElement = document.querySelector('#btn-task2')
const output2DOMElement = document.querySelector('#output2')

btn2DOMElement.addEventListener('click', event => {
	const alphabet = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ_'
	const controlWord = form2DOMElement.querySelector('#key-word').value
	const text = form2DOMElement.querySelector('#text-task2').value
		.replaceAll(' ', '_')
		.replaceAll('й', 'и')
		.toUpperCase()

	const scrollingText = str => {
		const arr = str.split('')
		const output = []

		for (let i = 0; i < arr.length; i++) {
			output.push(arr.join(''))
			arr.push(arr.shift())
		}

		return output
	}

	const createControlMatrix = () => {
		const result = []

		for (const char of controlWord) {
			for (const str of viginerMatrix) {
				if (char === str[0]) {
					result.push(str)
				}
			}
		}

		result.unshift(viginerMatrix[0])
		return result
	}

	const splitString = str => {
		const result = []

		for (let i = 0; i < str.length; i += controlWord.length) {
			result.push(str.substring(i, i + controlWord.length))
		}

		return result
	}

	const getKeyString = str => {
		const result = []

		for (let i = 0; i < str.length; i += controlWord.length) {
			if (str.length - i < controlWord.length) {
				let residue = ''

				for (let j = 0; j < str.length - i; j++) {
					residue = residue + controlWord[j]
				}
				result.push(residue)
			} else {
				result.push(controlWord)
			}
		}

		return result.join('')
	}

	const alpabetIndex = arr => arr.map(el => {
		for (let i = 0; i < alphabet.length; i++) {
			if (el === alphabet[i]) {
				return i
			}
		}
	})


	const getShifrText = (arrOfIndexes, keyStr) => {
		let result = ''

		for (let i = 0; i < arrOfIndexes.length; i++) {
			result = result + controlMatrix[keyStr[i]][arrOfIndexes[i]]
		}
		
		return result
	}
	////////////////////////////////////////

	const viginerMatrix = scrollingText(alphabet)

	const controlMatrix = createControlMatrix(controlWord)

	const keyStringIndexes = getKeyString(text).split('').map(el => {
		for (let i = 0; i < controlWord.length; i++) {
			if (el === controlWord[i]) {
				return i + 1
			}
		}
	})

	const textIndexes = alpabetIndex(text.split(''))

	const shifrText = getShifrText(textIndexes, keyStringIndexes)

	const result = splitString(shifrText).join(' ')


	// Вывод данных 

	function splitViginerForTable(arr) {
		let result = ''

		for (const el of arr) {
			result = result + '<tr>'

			let arrOfStr = el.split('')

			for (const char of arrOfStr) {
				result = result + '<td>' + char + '</td>'
			}
			
			result = result + '</tr>'
		}

		return result
	}

	function createTableString(arr, title) {
		return `
		<tr>
		<td class="td__title">${title}</td>
			${arr.map(el => `<td>${el}</td>`).join('')}
		</tr>`
	}


	function createOutput() {
		let output = output2DOMElement
		let title = 
		`<h2 class="output__title">
		Матрица шифрования для ключа <${controlWord}>
		</h2>`
		let title2 = '<h2 class="output__title">Алгоритм замены</h2>'

		output.innerHTML = `
		${title}
		<div class="table__wrapper">
			<table>
				${splitViginerForTable(controlMatrix)}
			</table>
		</div>
		<br>
		${title2}
		<div class="table__wrapper">
			<table>
				${createTableString(text.split(''), 'Исходный ключ')}
				${createTableString(getKeyString(text).split(''), 'Ключ')}
				${createTableString(shifrText.split(''), 'Текст после заметылюч')}
			</table>
		</div>
		<p class="output__result"><b>Резульат:</b> ${result}</p>
		`

		return output
	}

	createOutput()
})





