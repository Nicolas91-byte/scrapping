import csv
import json

def csv_to_json(csv_file, json_file):
    # Lee el archivo CSV y carga los datos en una lista de diccionarios
    with open(csv_file, 'r', encoding='utf-8-sig') as csvfile:
        # 'utf-8-sig' se usa para manejar el byte order mark (BOM) en algunos archivos CSV
        csv_data = csv.DictReader(csvfile)
        data = [row for row in csv_data]

    # Escribe los datos en formato JSON
    with open(json_file, 'w', encoding='utf-8') as jsonfile:
        jsonfile.write(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    # Ruta del archivo CSV de entrada
    csv_input_file = 'producto.csv'

    # Ruta del archivo JSON de salida
    json_output_file = 'archivo.json'

    # Llama a la función para convertir CSV a JSON
    csv_to_json(csv_input_file, json_output_file)

    print(f"La conversión de {csv_input_file} a {json_output_file} se ha completado con éxito.")
