from django.shortcuts import render
from .supabase import supabase


def home(request):
    return render(request, 'index.html')


def save_input(request):
    if request.method == "POST":
        input_id = request.POST.get("input_id")
        value = request.POST.get("value")
        time = request.POST.get("time")
        timestamp = request.POST.get("timestamp")

        response = supabase.table('inputs').insert({
            'input_id': input_id,
            'value': value,
            'time': time,
            'timestamp': timestamp,
        }).execute()

        if response.status_code == 201:
            return render(request, "success.html")
        else:
            return render(request, "error.html")
    return render(request, "input_form.html")


def load_inputs(request):
    response = supabase.table('inputs').select('*').execute()
    if response.status_code == 200:
        data = response.data
        return render(request, "inputs.html", {'data': data})
    return render(request, "error.html")
