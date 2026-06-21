<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="modal__close" @click="close" aria-label="Fermer">
        &times;
      </button>

      <p class="modal__message">Opération échouée</p>

      <button class="modal__ok" @click="close">Ok</button>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    const close = () => {
      emit('close')
    }

    return {
      close
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 32px 24px 24px;
  min-width: 280px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  &__close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    color: #888;

    &:hover {
      color: #333;
    }
  }

  &__message {
    margin: 16px 0 24px;
    font-size: 16px;
    color: #333;
  }

  &__ok {
    background: #e53935;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 24px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
      background: #c62828;
    }
  }
}
</style>