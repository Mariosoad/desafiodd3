'use client'

import React, { useEffect, useState } from "react";
import { Modal } from "@nextui-org/react";
import grillaControls from "@/controls/GrillaControls";
import Image from "next/image";

export default function ModalStats(props) {

    const dataIntentos = props.intentos
    const dataVictorias = props.victorias
    const openModal = props.dataModal
    const dataPalabra = props.dataPalabra
    const dataDark = props.dark
    const dataTiempo = props.tiempo
    const store = grillaControls;

    const [visible, setVisible] = useState(openModal);

    useEffect(() => {
        setVisible(openModal);
    }, [openModal]);

    const handlerStats = () => {
        setVisible(!visible)
        if (dataIntentos === 4) {
            store.iniciar()
        }
    };

    return (
        <div className="w-1.5/12">
            <button className={`w-12 h-12 rounded-full p-2 flex items-center justify-center`} onClick={handlerStats}>
                <Image src={dataDark ? "/icon-stats-dark.svg" : "/icon-stats-light.svg"} width={50} height={65} alt="DarkMode" />
            </button>
            <Modal width="380px" preventClose aria-labelledby="modal-title" open={visible} >
                <Modal.Body className={` ${dataDark ? "bg-[#262B3C] text-white" : "bg-[#F3F3F3] text-black "}`}>
                    <h2 className="font-bold text-xl text-center pt-4">Estadísticas</h2>
                    <div className="w-full flex flex-row items-center justify-between p-4">
                        <div className="text-center">
                            <p className="font-bold text-xl">{dataIntentos}</p>
                            <p className="text-lg">Jugadas</p>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-xl">{dataVictorias}</p>
                            <p>Victorias</p>
                        </div>
                    </div>
                    <div className="text-center p-4">
                        {openModal == true && <p>La palabra era: {dataPalabra} </p>}
                        <p className="text-center text-xs xs:text-sm/[10px] uppercase">Siguiente palabra</p>
                        <p className="font-bold text-xs py-2"> {dataTiempo}</p>
                    </div>
                    <div className="m-auto pt-2 pb-6">
                        <button className="px-12 py-1 bg-[#6AAA64] text-base font-bold text-white rounded-sm m-auto" onClick={handlerStats}>
                            Aceptar
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
