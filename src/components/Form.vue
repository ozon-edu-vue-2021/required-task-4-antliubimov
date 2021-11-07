<template>
  <div class="form">
    <div>
      <h3>Личные данные</h3>
      <div class="row">
        <div class="item">
          <label for="last_name"> Фамилия </label>
          <input type="text" id="last_name" />
        </div>
        <div class="item">
          <label for="first_name"> Имя </label>
          <input type="text" id="first_name" />
        </div>
        <div class="item">
          <label for="second_name"> Отчество </label>
          <input type="text" id="second_name" />
        </div>
      </div>
      <div class="row">
        <div class="item">
          <label for="birthday"> Дата рождения </label>
          <input type="text" id="birthday" />
        </div>
      </div>
      <div class="item">
        <label for="email"> E-mail </label>
        <input type="text" id="email" />
      </div>
      <div class="row">
        <div class="item">
          <p>Пол</p>
          <div>
            <input type="radio" id="man" name="sex" value="man" />
            <label for="man">Мужской</label>
            <input type="radio" id="woman" name="sex" value="woman" />
            <label for="woman">Женский</label>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h3>Паспортные данные</h3>
      <div class="row">
        <div class="item">
          <label for="citizen_select">Гражданство</label>
          <select id="citizen_select">
            <option value=""></option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="item">
          <label for="series_passport"> Серия паспорта</label>
          <input type="text" id="series_passport" />
        </div>
        <div class="item">
          <label for="number_passport"> Номер паспорта </label>
          <input type="text" id="number_passport" />
        </div>
        <div class="item">
          <label for="date_issuance"> Дата выдачи </label>
          <input type="text" id="date_issuance" />
        </div>
      </div>
      <div>
        <div class="item">
          <p>Меняли ли фамилию?</p>
          <div>
            <input
              type="radio"
              id="no-change-fam"
              name="change-family"
              value="no"
            />
            <label for="no-change-fam">Нет</label>
            <input
              type="radio"
              id="change-fam"
              name="change-family"
              value="yes"
            />
            <label for="change-fam">Да</label>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <label for="change_last_name"> Фамилия </label>
            <input type="text" id="change_last_name" />
          </div>
          <div class="item">
            <label for="change_first_name"> Имя </label>
            <input type="text" id="change_first_name" />
          </div>
        </div>
      </div>
    </div>
    <button>Отправить</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.form {
  margin: 0 auto;
  padding: 30px;
  max-width: 1200px;
  background-color: #ffffff;
  border: 1px solid #dbdfe6;
  border-radius: 5px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.row:not(:last-child) {
  margin-bottom: 20px;
}
.item {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #8e9bac;
}
.item:not(:last-child) {
  margin-right: 30px;
}

input,
select {
  padding: 5px 10px;
  border: 3px solid #dadee5;
  border-radius: 5px;
}
</style>
