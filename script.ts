interface Vehicle{
    name: string,
    plate: string,
    entrance: Date | string
}
(function(){
    const $ = (query: string): HTMLInputElement |
     null => document.querySelector(query);

     const timeCalculator = (time: number): string =>{
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor(time % 60000) / 1000;

        return `${minutes} min e ${seconds} segs`;
     }

     const courtyard = () =>{

        const read = (): Vehicle[] => {
            return localStorage.courtyard ? JSON.parse(localStorage.courtyard ): [];
        }

        const toSave = (vehicles: Vehicle[]) =>{
            localStorage.setItem('courtyard', JSON.stringify(vehicles));
        }

        const add = (vehicle: Vehicle, save?: boolean) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.name}</td>
                <td>${vehicle.plate}</td>
                <td>${vehicle.entrance}</td>
                <td>
                    <button class = 'delete' data-plate = '${vehicle.plate}'>X</button>
                </td>
            `;

            row.querySelector('.delete')?.addEventListener('click', function(){
                remove(this.dataset.plate);
            })

            $('#courtyard')?.appendChild(row);

            if(save) toSave([...read(), vehicle]);
            
        }
        const remove = (plate: string) => {
            const {name, entrance} = read().find(vehicle => vehicle.plate === plate);
            const time = timeCalculator(new Date().getTime() - new Date(entrance).getTime());
            console.log(name)
            if(!confirm(`O veículo ${name} permaneceu por ${time}. Deseja encerrar?`)) return;

            toSave(read().filter(vehicle => vehicle.plate !== plate));
            render();
        }
        const render = () => {
            $('#courtyard')!.innerHTML = '';
            const courtyard = read();
            
            if(courtyard.length){
                courtyard.forEach(vehicle => add(vehicle));
            }
        }

        return {read, add, remove, render}
     }

     courtyard().render();
    $('#register')?.addEventListener('click', () =>{
        const name = $("#name")?.value;
        const plate = $("#plate")?.value;

        if(!name || !plate){
            alert('Os campos são obrigatórios!!!');
            return;
        }

        courtyard().add({name, plate, entrance: new Date().toISOString()}, true)
    });
})()