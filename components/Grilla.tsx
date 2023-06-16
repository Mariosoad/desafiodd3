export default function Grilla({ palabraAcertada, userPalabra, palabra }) {
    return (
        <div className="w-100 mb-2 grid grid-cols-5 gap-2">
            {new Array(5).fill(0).map((_, i) => {
                const bgCelda = !palabraAcertada
                        ? 'bg-[#DADDDE]'
                        : userPalabra[i] === palabra[i]
                            ? 'bg-[#66A060]'
                            : palabra.includes(userPalabra[i])
                                ? 'bg-[#CEB02C]'
                                : 'bg-[#939B9F]';
                return (
                    <div key={i} className={`flex h-16 w-16 xs:w-14 xs:h-14 items-center justify-center border border-gray-400 rounded-md font-bold uppercase text-white ${bgCelda}`}>
                        {userPalabra[i]}
                    </div>
                )
            })}
        </div>
    )
}
