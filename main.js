// Datos de las cuentas (solo para propósitos de demostración)
const accounts = [
    { id: 1, password: '1234', balance: 500 },
    { id: 2, password: '5678', balance: 990 },
    { id: 3, password: 'abcd', balance: 200 }
];

console.log(accounts);

let selectedAccount = null;

function showOptions() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('options').style.display = 'block';
    document.getElementById('balance').style.display = 'none';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById('withdraw').style.display = 'none';
}

function showBalance() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('balance').style.display = 'block';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById('withdraw').style.display = 'none';

    const account = accounts.find(acc => acc.id === selectedAccount);
    document.getElementById('balanceAmount').textContent = '$' + account.balance;
}

function showDeposit() {
    showBalance();
    document.getElementById('login').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('balance').style.display = 'none';
    document.getElementById('deposit').style.display = 'block';
    document.getElementById('withdraw').style.display = 'none';
    
}

function showWithdraw() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('balance').style.display = 'none';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById('withdraw').style.display = 'block';
}

function handleLogin() {
    const selectedAccountId = document.getElementById('accountSelect').value;
    const password = document.getElementById('passwordInput').value;

    const account = accounts.find(acc => acc.id === parseInt(selectedAccountId));

    if (account && account.password === password) {
        selectedAccount = account.id;
        showOptions();
    } else {
        alert('Cuenta o contraseña incorrecta. Inténtalo nuevamente.');
    }
}

function handleCheckBalance() {
    showBalance();
}

function handleDeposit() {
    showDeposit();
}

function handleWithdraw() {
    showWithdraw();
}

function handleDepositConfirm() {
    const depositAmount = parseFloat(document.getElementById('depositAmountInput').value);

    if (depositAmount <= 0 || depositAmount === NaN) {
        alert('Ingresa un monto válido.');
        return;
    }

    const account = accounts.find(acc => acc.id === selectedAccount);
    const newBalance = account.balance + depositAmount;

    if (newBalance > 990) {
        alert('El saldo máximo permitido es $990. Ingresa un monto menor.');
        return;
    }

    account.balance = newBalance;
    alert(`Se ha ingresado $${depositAmount.toFixed(2)}. El nuevo saldo es $${newBalance.toFixed(2)}.`);
    showOptions();
}

function handleWithdrawConfirm()        {
    const withdrawAmount = parseFloat(document.getElementById('withdrawAmountInput').value);

    if (withdrawAmount <= 0) {
        alert('Ingresa un monto válido.');
        return;
    }

    const account = accounts.find(acc => acc.id === selectedAccount);
    const newBalance = account.balance - withdrawAmount;

    if (newBalance < 10) {
        alert('El saldo mínimo permitido es $10. Ingresa un monto menor.');
        return;
    }

    account.balance = newBalance;
    alert(`Se ha retirado $${withdrawAmount.toFixed(2)}. El nuevo saldo es $${newBalance.toFixed(2)}.`);
    showOptions();
}

function handleLogout() {
    selectedAccount = null;
    document.getElementById('login').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('balance').style.display = 'none';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById('withdraw').style.display = 'none';
}

document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('checkBalanceButton').addEventListener('click', handleCheckBalance);
document.getElementById('depositButton').addEventListener('click', handleDeposit);
document.getElementById('withdrawButton').addEventListener('click', handleWithdraw);
document.getElementById('depositConfirmButton').addEventListener('click', handleDepositConfirm);
document.getElementById('withdrawConfirmButton').addEventListener('click', handleWithdrawConfirm);
document.getElementById('logoutButton').addEventListener('click', handleLogout);
document.getElementById('backButton1').addEventListener('click', showOptions);
document.getElementById('backButton2').addEventListener('click', showOptions);
document.getElementById('backButton3').addEventListener('click', showOptions);
