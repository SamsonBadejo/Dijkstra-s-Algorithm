class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

function dijkstra(graph, start) {
    const distances = {};
    const priorityQueue = new PriorityQueue();
    const previous = {};
    let smallest;

    // Initialize distances and priority queue
    for (let vertex in graph) {
        if (vertex === start) {
            distances[vertex] = 0;
            priorityQueue.enqueue(vertex, 0);
        } else {
            distances[vertex] = Infinity;
            priorityQueue.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
    }

    // Process the queue
    while (!priorityQueue.isEmpty()) {
        smallest = priorityQueue.dequeue().val;

        if (smallest === undefined) break;

        for (let neighbor in graph[smallest]) {
            let distance = distances[smallest] + graph[smallest][neighbor];

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = smallest;
                priorityQueue.enqueue(neighbor, distance);
            }
        }
    }

    return distances;
}

function applyDijkstra() {
    const startNode = document.getElementById('start').value;
    const graphInput = document.getElementById('graph').value;

    let graph;
    try {
        graph = JSON.parse(graphInput);
    } catch (e) {
        alert("Invalid graph input. Please provide a valid JSON.");
        return;
    }

    const distances = dijkstra(graph, startNode);

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<pre>${JSON.stringify(distances, null, 2)}</pre>`;
}
