(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    const timeCalculator = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor(time % 60000) / 1000;
        return `${minutes} min e ${seconds} segs`;
    };
    const courtyard = () => {
        const read = () => {
            return localStorage.courtyard ? JSON.parse(localStorage.courtyard) : [];
        };
        const toSave = (vehicles) => {
            localStorage.setItem('courtyard', JSON.stringify(vehicles));
        };
        const add = (vehicle, save) => {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.entrance}</td>
                <td>
                    <button class = 'delete' data-plate = '${vehicle.plate}'>X</button>
                </td>
            `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remove(this.dataset.plate);
            });
            (_b = $('#courtyard')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (save)
                toSave([...read(), vehicle]);
        };
        const remove = (plate) => {
            const { name, entrance } = read().find(vehicle => vehicle.plate === plate);
            const time = timeCalculator(new Date().getTime() - new Date(entrance).getTime());
            console.log(name);
            if (!confirm(`O veículo ${name} permaneceu por ${time}. Deseja encerrar?`))
                return;
            toSave(read().filter(vehicle => vehicle.plate !== plate));
            render();
        };
        const render = () => {
            $('#courtyard').innerHTML = '';
            const courtyard = read();
            if (courtyard.length) {
                courtyard.forEach(vehicle => add(vehicle));
            }
        };
        return { read, add, remove, render };
    };
    courtyard().render();
    (_a = $('#register')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        const plate = (_b = $("#plate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !plate) {
            alert('Os campos são obrigatórios!!!');
            return;
        }
        courtyard().add({ name, plate, entrance: new Date().toISOString() }, true);
    });
})();
