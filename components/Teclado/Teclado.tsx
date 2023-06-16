import grillaControls from "@/controls/GrillaControls";

export default function Teclado() {
    const teclas = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

    function handleClick(e) {
        const event = new KeyboardEvent("keydown", { key: e.toUpperCase() });
        grillaControls.handleKeyUp(event);
    }

    return (
        <div className="w-100 mt-4 p-4 rounded-lg bg-[#DADCE04D]">
            {teclas.map((row, i) => (
                <div key={i} className="flex justify-center">
                    {row.split("").map((char, a) => {
                        const bgColor =
                            grillaControls.letraAcertada.includes(char.toLowerCase())
                                ? 'bg-[#66A060] text-white'
                                : grillaControls.letraIncorrecta.includes(char.toLowerCase())
                                    ? 'bg-[#CEB02C] text-white'
                                    : grillaControls.totalLetras.includes(char.toLowerCase())
                                        ? 'bg-[#939B9F] text-white'
                                        : 'bg-[#D3D6DA] text-[#56575E]';
                        return (
                            <div key={a} className={`rounded-md m-1 flex h-10 w-10 xs:h-7 xs:w-7 items-center justify-center ${bgColor}`}>
                                <button className="h-10 w-10 xs:h-7 xs:w-7 font-bold text-sm xs:text-sm/[9px] uppercase" onClick={() => handleClick(char)} >
                                    {char}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
