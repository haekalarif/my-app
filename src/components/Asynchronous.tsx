import React, { useEffect } from "react";
import { useExitPrompt } from "../helper/helper";

function Asynchronous() {

    const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
    async function fetchDataSync() {
        try {
            // Memanggil API dan menunggu hasilnya
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

            // Menunggu parsing JSON selesai
            const data = await response.json();

            // Menampilkan data di console setelah diterima
            console.log(data);
            console.log("woi")
        } catch (error) {
            console.error('Error:', error);
        }

    }


    function fetchDataAsync() {
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => {
                // Mengembalikan hasil respons dalam bentuk JSON
                console.log("woi")
                return response.json();
            })
            .then(data => {
                // Menampilkan data setelah diterima
                console.log("woilah")
                console.log(data);
            })
            .catch(error => {
                // Menangani jika ada error saat memanggil API
                console.error('Error:', error);
            });
        console.log("bro");
    }
    const handleClick = (e) => {
        e.preventDefault();
        setShowExitPrompt(!showExitPrompt)
    }

    function loadData() {
        console.log(`user id: ${"haekal"}`, `user email: ${"haekal.rozikin@kitameraki.com"}`, `tickets count: ${20}`, `tickets query charge: ${20}`);
    }

    //NOTE: this similar to componentWillUnmount()
    useEffect(() => {
        loadData();
        // fetchDataSync();
        // fetchDataAsync();
        // console.log(URL);
        // return () => {
        //     console.log("Unmount")
        //     setShowExitPrompt(false);
        // }
    }, []);
    return (<>
        <button onClick={handleClick}> {showExitPrompt ? "Hide" : "Show"} the prompt</button>
    </>)
}

export default Asynchronous;