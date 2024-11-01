let pangrams= [
    "Съешь же ещё этих мягких французских булок, да выпей чаю.",
    "Широкая электрификация южных губерний даст мощный толчок подъёму сельского хозяйства.",
    "Вступив в бой с шипящими змеями — эфой и гадюкой — маленький, цепкий, храбрый ёж чуть не съел их.",
    "Любя, съешь щипцы, — вздохнёт мэр, — кайф жгуч.",
    "Шеф взъярён тчк щипцы с эхом гудбай Жюль.",
    "Эй, жлоб! Где туз? Прячь юных съёмщиц в шкаф.",
    "Экс-граф? Плюш изъят. Бьём чуждый цен хвощ!",
    "Эх, чужак! Общий съём цен шляп юфть — вдрызг!",
    "Эх, чужд кайф, сплющь объём вши, грызя цент.",
    "Чушь: гид вёз кэб цапф, юный жмот съел хрящ.",
];
const f = document.querySelector('form');
const sentencefield = document.querySelector('#sentence');
const result = document.querySelector('.result');
const demos = document.querySelector('#demos');

const check = sentence => {
    const letters = 'ёйцукенгшщзхъфывапролджэячсмитьбю';
    const chars = sentence.toLowerCase().replace(/[^ё-ю]/g, '').split(''); 
    const uniqueLetters = new Set(chars);
    if (uniqueLetters.size === 33) {
        let letters = {};
        chars.forEach(char => {
            letters[char] = letters[char] ? letters[char] + 1 : 1;
        });
        let duplicates = [];
        Object.keys(letters).forEach(letter => {
            if (letters[letter] > 1) {
                duplicates.push(`${letters[letter]}×${letter}`);
            }
        });     
        result.textContent = `'Это панграмма длиной в ${sentence.length} букв. Дважды повторяются: ${duplicates.join(', ')}.`;
        result.classList.add('valid');
    } else {
        let missing = [];
        letters.split('').forEach(letter => {
            if (!uniqueLetters.has(letter)) {
                missing.push(letter);
            }
        })
        result.textContent = 'Это не панграмма. Отсутствуют буквы: ' + missing.join(', ') + '.';
        result.classList.remove('valid');
    }
}
sentencefield.addEventListener ('keyup', (e) => {
    check(sentencefield.value);
})
f.addEventListener('submit', (e) => {
    e.preventDefault();
    check(sentencefield.value);
})
pangrams.forEach(pangram => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = pangram;
    li.appendChild(button);
    demos.appendChild(li);
})
demos.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        sentencefield.value = e.target.textContent;
        check(sentencefield.value);
    }
})
