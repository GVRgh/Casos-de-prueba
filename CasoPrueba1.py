import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

# Crear opciones del navegador
options = Options()
# Configurar opciones del navegador
options.add_argument("--start-maximized")  # Esto maximiza la ventana


# Configurar el driver con Service y pasar las opciones
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)
# Abrir pagina de prueba
driver.get("http://localhost:3000/")

time.sleep(2)
driver.find_element(By.ID, "mascota").send_keys("macarena")
time.sleep(2)
driver.find_element(By.ID, "propietario").send_keys("Juan Perez")
time.sleep(2)
driver.find_element(By.ID, "email").send_keys("juanperez@gmail.com")
time.sleep(2)
driver.find_element(By.ID, "cita").send_keys("2025"+ Keys.ARROW_RIGHT+"05-02")
time.sleep(2)
driver.find_element(By.ID, "observaciones").send_keys("colitis de 4 dias de evolucion")
time.sleep(2)
driver.find_element(By.ID, "agregar").click()
time.sleep(3)
driver.switch_to.alert.accept()
input("Presiona ENTER para cerrar el navegador...")
driver.quit()


















time.sleep(10)

