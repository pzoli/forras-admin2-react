import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    const navlist = [
        {
            label: 'Home', icon: 'pi pi-fw pi-home', command: () => {
                //window.location.href = '/';
            },
            url: '/'
        },
        {
            label: 'Doctor', icon: 'pi pi-fw pi-calendar', command: () => {
                //window.location.href = '/doctor'
            },
            url: '/doctor'
        },
        {
            label: 'Protected', icon: 'pi pi-fw pi-calendar', command: () => {
                //window.location.href = '/protected'
            },
            url: '/protected'
        },
    ];

    return (
        <div>
            <header>
                <nav>
                    <Menubar
                        model={navlist}
                    />
                </nav>
            </header>
        </div>
    )
}
export default Navigation;
