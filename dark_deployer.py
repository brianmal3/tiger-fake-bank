import os
import re
import subprocess
import time

tag = "🍎🍎🍎 The Dark Deployer 🍎"

# Define variables
PROJECT_ID = "recon-back"
IMAGE_NAME = "fake-bank-image"
REGION = "europe-west1"
SERVICE_NAME = "fake-bank-service"

total_elapsed_seconds: float = 0


def edit_env(env_file, key, new_value):
    """Edits an .env file and changes the value of a key.

    Args:
      env_file: Path to the .env file.
      key: Key to modify.
      new_value: New value for the key.

    Returns:
      True if the file was successfully updated, False otherwise.
    """
    print(
        f"{tag} edit .env file to change STATUS to prod and back to dev after deployment is complete."
    )

    if not os.path.exists(env_file):
        print(f"{tag} Error: .env file not found at '{env_file}'")
        return False

    with open(env_file, "r") as f:
        lines = f.readlines()

    updated_lines = []
    for line in lines:
        match = re.match(rf"^{key}=.*", line)
        if match:
            updated_lines.append(f"{key}={new_value}\n")
        else:
            updated_lines.append(line)

    with open(env_file, "w") as f:
        f.writelines(updated_lines)

    print(
        f"\n{tag} 🥬 🥬 Successfully updated '{key}' in '{env_file}' to '{new_value}'\n"
    )
    return True


def run_command(command):
    """Runs a terminal command and checks for successful execution.

    Args:
        command: The command to execute as a string.

    Returns:
        True if the command executed successfully, False otherwise.
    """

    start_time = time.time()
    print(f"{tag} Running command:  🔵 {command}  🔵")
    process = subprocess.run(command, shell=True, capture_output=True, text=True)
    elapsed_time = time.time() - start_time

    global total_elapsed_seconds  # Tell the function to use the global variable
    total_elapsed_seconds += elapsed_time  # Use the += operator for clarity

    # Check if the command executed successfully
    if process.returncode == 0:
        print(
            f"{tag} Command executed successfully. 🥬 Elapsed time: 🌼 {elapsed_time:.2f} seconds\n"
        )
        return True
    else:
        print(
            f"{tag} Error: 👿👿👿 Command failed with return code {process.returncode}.\n"
        )
        print(f"{tag} Error: {process.stderr}\n")
        return False


def start():
    """start cloud deployment ..."""

    print(f"\n\n{tag} Starting deployment of Tiger Fake Bank Service...")
    edit_env(".env", "STATUS", "prod")
    print("\n")
    if not run_command("npm run build"):
        print(f"{tag} Error: npm run build failed. Exiting deployment.")
        return
    print("\n")
    if not run_command(
        f"docker buildx build --platform linux/amd64 -t gcr.io/{PROJECT_ID}/{IMAGE_NAME} . "
    ):
        print(f"{tag} Error: Docker build failed. Exiting deployment.")
        return
    print("\n")
    if not run_command(f"docker push gcr.io/{PROJECT_ID}/{IMAGE_NAME}"):
        print(f"{tag} Error: Docker push failed. Exiting deployment.")
        return
    print("\n")
    if not run_command(
        f"""
    gcloud run deploy {SERVICE_NAME} \
  --image gcr.io/{PROJECT_ID}/{IMAGE_NAME} \
  --platform managed \
  --region {REGION} \
  --allow-unauthenticated
                """
    ):
        print(f"{tag} Error: gcloud run deploy failed. Exiting deployment.")
        return

    edit_env(".env", "STATUS", "dev")
    print(f"\n{tag} 🦠🦠🦠🦠🦠🦠🦠🦠 Deployment complete! 🦠🦠🦠 \n")
    print(f"{tag} Total elapsed time: {total_elapsed_seconds:.2f} seconds\n\n")


start()
