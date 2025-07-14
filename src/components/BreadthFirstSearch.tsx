import React from "react"


const BreadthFirstSearch = () => {
    // Representasi graf menggunakan adjacency list
    const graph = {
        A: ['B', 'C'],
        B: ['D', 'E'],
        C: ['F'],
        D: [],
        E: ['F'],
        F: []
    };

    // Fungsi BFS
    function bfs(graph: Object, startNode: string, targetNode: string) {
        // Antrian untuk melacak node yang akan dieksplorasi
        let queue: string[] = [startNode];
        // Set untuk melacak node yang sudah dikunjungi
        let visited: string[] = [];
        // Objek untuk melacak jalur
        let parent: Object = {};
        parent[startNode] = null;

        let i = 1;
        // Selama antrian tidak kosong
        while (queue.length > 0) {
            // Ambil node pertama dari antrian
            let currentNode: string = queue.shift();

            // Jika menemukan node yang ditargetkan, bangun jalur dari startNode ke targetNode
            if (currentNode === targetNode) {
                let path = [currentNode];
                while (parent[currentNode] !== null) {
                    currentNode = parent[currentNode];
                    path.unshift(currentNode);
                }
                return path;
            }

            // Tandai node sebagai sudah dikunjungi
            visited.push(currentNode);

            // Eksplorasi tetangga-tetangga node saat ini
            for (let neighbor of graph[currentNode]) {
                if (!visited.includes(neighbor)) {
                    queue.push(neighbor);
                    visited.push(neighbor);
                    // Simpan parent untuk melacak jalur
                    parent[neighbor] = currentNode;
                }
            }
            console.log(`Looping ke ${i}`);
            console.log(queue)
            console.log(visited)
            console.log(parent)
            i++;
        }

        // Jika targetNode tidak ditemukan
        return null;
    }

    // Contoh penggunaan
    // const startNode = 'A';
    // const targetNode = 'F';
    // const path = bfs(graph, startNode, targetNode);

    // if (path) {
    //     console.log(`Jalur dari ${startNode} ke ${targetNode}: ${path.join(' -> ')}`);
    // } else {
    //     console.log(`Tidak ada jalur dari ${startNode} ke ${targetNode}`);
    // }

    // A to F
    //Result of 1st looping
    // queue = [b, c]
    // visited = [a, b, c]
    // parent = {
    //     a: null,
    //     b: a,
    //     c: a 
    // }

    //Result of 2st looping
    // queue = [d, e]
    // visited = [b, d, e]
    // parent = {
    //     a: null,
    //     b: a,
    //     c: a,
    //     d: b,
    //     e: b 
    // }

    // Result of 3rd looping
    // queue = [f]
    // visited = [d, e, f]
    // parent = {
    //     a: null,
    //     b: a,
    //     c: a,
    //     d: b,
    //     e: b,
    //     f: e 
    // }

    // Result of 4th looping
    // path = [a,b,e,f]

    // Representasi jaringan sosial sebagai adjacency list
    // const socialNetwork = {
    //     "User1": ["User2", "User3"],
    //     "User2": ["User1", "User4", "User5"],
    //     "User3": ["User1", "User6"],
    //     "User4": ["User2"],
    //     "User5": ["User2", "User6"],
    //     "User6": ["User3", "User5"]
    // };
    const socialNetwork = {
        "User1": ["User2", "User3", "User7"],
        "User2": ["User1", "User4", "User5"],
        "User3": ["User1", "User6"],
        "User4": ["User2", "User10"],
        "User5": ["User2", "User11"],
        "User6": ["User3", "User12"],
        "User7": ["User1", "User8", "User9"],
        "User8": ["User7", "User13"],
        "User9": ["User7"],
        "User10": ["User4"],
        "User11": ["User5"],
        "User12": ["User6"],
        "User13": ["User8"]
    };

    // Fungsi BFS untuk rekomendasi teman
    function friendRecommendation(socialNetwork, startUser) {
        let queue = [startUser];
        let visited: string[] = [];
        visited.push(startUser);

        let friends: string[] = socialNetwork[startUser]; // Teman langsung
        let recommendations: string[] = []; // Teman yang direkomendasikan

        while (queue.length > 0) {
            let currentUser = queue.shift();
            for (let friend of socialNetwork[currentUser]) {
                if (!visited.includes(friend)) {
                    visited.push(friend);
                    queue.push(friend);

                    // Tambahkan ke rekomendasi jika bukan teman langsung
                    if (!friends.includes(friend)) {
                        recommendations.push(friend);
                    }
                }
            }
        }

        return recommendations; // Konversi ke array untuk hasil akhir
    }

    // Contoh penggunaan
    const recommendedFriends = friendRecommendation(socialNetwork, "User1");
    console.log(`Teman yang direkomendasikan untuk User1:`, recommendedFriends);

    return (<></>)
}

export default BreadthFirstSearch