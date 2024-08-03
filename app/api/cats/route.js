// app/api/cats/route.js
let cats = [];

export async function GET(request) {
    return new Response(JSON.stringify(cats), { status: 200 });
}

export async function POST(request) {
    const { name } = await request.json();
    if (name) {
        const newCat = { id: Date.now(), name };
        cats.push(newCat);
        return new Response(JSON.stringify(newCat), { status: 201 });
    } else {
        return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
    }
}

export async function PUT(request) {
    const { id, newName } = await request.json();
    const catIndex = cats.findIndex(cat => cat.id === id);
    if (catIndex > -1) {
        cats[catIndex].name = newName;
        return new Response(JSON.stringify(cats[catIndex]), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: 'Cat not found' }), { status: 404 });
    }
}

export async function DELETE(request) {
    const { deleteId } = await request.json();
    cats = cats.filter(cat => cat.id !== deleteId);
    return new Response(null, { status: 204 });
}
