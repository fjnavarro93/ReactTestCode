import logo from '../_img/logo.png'
export default function Header() {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <a class="navbar-brand" href="/"><img src={logo}/></a>
                </div>
            </nav>
        </>
    );
}