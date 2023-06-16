'use client'

import React, { useState, useEffect } from "react";
import { Modal } from "@nextui-org/react";

export default function ModalInfo(props) {
    const dataDark = props.dark
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(visible);
        // Comprobar si el modal ya se abrio una vez
        const isModalShow = localStorage.getItem('infoModal');
        if (!isModalShow) {
            // Si el modal no fue mostrado, lo muestra al ingresar
            setVisible(true);
            // Almacenado en localStorage
            localStorage.setItem('infoModal', 'true');
        }
    }, []);

    const handler = () => setVisible(!visible);

    const gato = ["G", "A", "T", "O", "S"]
    const vocal = ["V", "O", "C", "A", "L"]
    const canto = ["C", "A", "N", "T", "O"]

    return (
        <div className="w-3/12">
            <button className={`w-8 h-8 rounded-full p-2 flex items-center justify-center ${dataDark ? "bg-[#DADCE0] text-black" : "bg-[#818181] text-white"} `} onClick={handler}> ? </button>
            <Modal width="380px" preventClose aria-labelledby="modal-title" open={visible} >
                <Modal.Body className={` ${dataDark ? "bg-[#262B3C] text-white" : "bg-[#F3F3F3] text-black "}`}>
                    <h2 className="font-bold text-xl text-center pt-6 pb-4">Cómo jugar</h2>
                    <p className="text-xs xs:text-[14px]"> Adivina la palabra oculta en cinco intentos.</p>
                    <p className="text-xs xs:text-[14px]"> Cada intento debe ser una palabra válida de 5 letras.</p>
                    <p className="text-xs xs:text-[14px]"> Después de cada intento el color de las letras cambia para mostrar qué tan cerca estás de acertar la palabra.</p>
                    <p className="font-bold text-xs xs:text-[14px]">Ejemplos</p>
                    <div className=" mb-1 grid grid-cols-5 gap-1 [&>*:nth-child(1)]:bg-[#6AAA64]">
                        {gato.map((cat, a) => {
                            return (
                                <div key={a} className={`flex h-14 w-14 items-center justify-center border rounded-md font-bold uppercase text-xl ${dataDark ? "text-white border-white" : "text-black border-black bg-white"} `}>
                                    {cat}
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-xs xs:text-[14px]">La letra <strong>G</strong> está en la palabra y en la posición correcta.</p>
                    <div className=" mb-1 grid grid-cols-5 gap-1 [&>*:nth-child(3)]:bg-[#CEB02C]">
                        {vocal.map((voc, b) => {
                            return (
                                <div key={b} className={`flex h-14 w-14 items-center justify-center border rounded-md font-bold uppercase text-xl ${dataDark ? "text-white border-white " : "text-black border-black bg-white"} `}>
                                    {voc}
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-xs xs:text-[14px]">La letra <strong>C</strong> está en la palabra pero en la posición incorrecta.</p>
                    <div className=" mb-1 grid grid-cols-5 gap-1 [&>*:nth-child(5)]:bg-[#939B9F]">
                        {canto.map((can, c) => {
                            return (
                                <div key={c} className={`flex h-14 w-14 items-center justify-center border rounded-md font-bold uppercase text-xl ${dataDark ? "text-white border-white" : "text-black border-black bg-white"} `}>
                                    {can}
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-xs xs:text-[14px]">La letra <strong>O</strong> no está en la palabra.</p>

                    <p className="text-xs xs:text-[14px] py-4">Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>

                    <p className="text-center text-xs xs:text-[14px] p-4">¡Una palabra nueva cada 5 minutos!</p>

                    <div className="m-auto pt-4 pb-2">
                        <button className="px-14 py-1 bg-[#6AAA64] text-base	 font-bold text-white rounded-sm m-auto uppercase" onClick={handler}>
                            ! Jugar ¡
                        </button>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    );
}
