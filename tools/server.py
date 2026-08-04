from livereload import Server
import os

# Cambia la directory di lavoro nella cartella madre (dove ci sono i file HTML)
os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

server = Server()
# Osserva tutti i file nella cartella corrente
server.watch('.')

print("==========================================")
print("   IMPACT CHURCH - LIVE RELOAD SERVER")
print("   Porta: 5500")
print("==========================================")

server.serve(port=5500, host='0.0.0.0')
